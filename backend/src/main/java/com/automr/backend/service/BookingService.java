package com.automr.backend.service;

import com.automr.backend.model.Booking;
import com.automr.backend.model.BookingStatus;
import com.automr.backend.model.Settings;
import com.automr.backend.repository.BookingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);
    private static final int MAX_BOOKINGS_PER_DAY = 3;

    @Autowired private BookingRepository bookingRepository;
    @Autowired private StripeService stripeService;
    @Autowired private EmailService emailService;
    @Autowired private SettingsService settingsService;

    @Transactional
    public Booking createBooking(Booking booking) {
        Settings settings = settingsService.getSettings();

        // 1) No past start dates
        if (booking.getStartDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Start date cannot be in the past.");
        }

        // 2) Age check
        if (booking.getAge() < 24) {
            throw new IllegalArgumentException("Driver must be at least 24 years old.");
        }

        // 3) Minimum rental days (inclusive)
        long daysBetween = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate());
        long rentalDays = daysBetween + 1;
        if (rentalDays < settings.getMinimumRentalDays()) {
            throw new IllegalArgumentException(
                "Minimum rental period is " + settings.getMinimumRentalDays() + " days.");
        }

        // 4) Availability
        long overlapping = bookingRepository
            .countByStartDateLessThanEqualAndEndDateGreaterThanEqual(
                booking.getEndDate(), booking.getStartDate());
        if (overlapping >= MAX_BOOKINGS_PER_DAY) {
            throw new IllegalStateException("No cars available for the selected dates.");
        }

        // 5) Pickup-details conditional validation
        if (Boolean.TRUE.equals(booking.getAirportPickup())) {
            if (booking.getPickupLocation() == null
                || booking.getPickupTime()     == null
                || booking.getDropoffTime()    == null) {
                throw new IllegalArgumentException(
                    "Pickup location and times must be provided when airportPickup is true.");
            }
        }

        // 6) Compute payment
        int totalAmount = (int) rentalDays * settings.getDailyRate();
        booking.setPaymentAmount(totalAmount);

        // 7) Stripe PaymentIntent
        if (booking.getPaymentIntentId() == null) {
            try {
                var intent = stripeService
                    .createPaymentIntent(totalAmount, "AutoMR Booking: " + rentalDays + " days");
                booking.setPaymentIntentId(intent.getId());
            } catch (Exception e) {
                logger.error("Stripe payment failed: {}", e.getMessage());
                throw new RuntimeException("Stripe payment failed: " + e.getMessage());
            }
        }

        // 8) Persist
        Booking saved = bookingRepository.save(booking);
        logger.info("Booking created: id={}, name={}, amount={}€",
            saved.getId(), saved.getFullName(), saved.getPaymentAmount());

        // 9) Confirmation email
        emailService.sendBookingConfirmation(
            saved.getEmail(),
            "Booking Confirmation - AutoMR",
            "Dear " + saved.getFullName() + ",\n\n" +
            "Your booking from " + saved.getStartDate() +
            " to " + saved.getEndDate() +
            " (" + rentalDays + " days) has been confirmed.\n\n" +
            "Total: €" + saved.getPaymentAmount() +
            "\n\nThank you,\nThe AutoMR Team"
        );

        return saved;
    }

    public List<Booking> getAllBookings() {
        logger.info("Retrieving all bookings");
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        // refund 50%, if paid
        if (booking.getPaymentIntentId() != null) {
            try {
                int refundAmount = booking.getPaymentAmount() / 2;
                stripeService.refundPartial(booking.getPaymentIntentId(), refundAmount);
                logger.info("Booking cancelled: id={}, refunded={}€",
                    bookingId, refundAmount);
            } catch (Exception e) {
                logger.error("Refund failed for booking id={}: {}",
                    bookingId, e.getMessage());
                throw new RuntimeException("Refund failed: " + e.getMessage());
            }
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        Booking updated = bookingRepository.save(booking);

        emailService.sendBookingConfirmation(
            updated.getEmail(),
            "Booking Cancellation - AutoMR",
            "Dear " + updated.getFullName() + ",\n\n" +
            "Your booking from " + updated.getStartDate() +
            " to " + updated.getEndDate() + " has been cancelled." +
            (updated.getPaymentIntentId() != null
                ? "\n\nWe have refunded 50%: €" + (updated.getPaymentAmount()/2)
                : "\n\nNo payment to refund.") +
            "\n\nThank you,\nThe AutoMR Team"
        );

        return updated;
    }

    @Transactional
    public void deleteBooking(Long bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new IllegalArgumentException("Booking not found");
        }
        bookingRepository.deleteById(bookingId);
        logger.warn("Booking deleted: id={}", bookingId);
    }

    @Transactional
    public Booking updateBooking(Long bookingId, Booking updatedBooking) {
        Booking existing = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        // copy allowed fields
        existing.setFullName(updatedBooking.getFullName());
        existing.setEmail(updatedBooking.getEmail());
        existing.setPhone(updatedBooking.getPhone());
        existing.setStartDate(updatedBooking.getStartDate());
        existing.setEndDate(updatedBooking.getEndDate());
        existing.setAge(updatedBooking.getAge());
        existing.setAirportPickup(updatedBooking.getAirportPickup());
        existing.setPickupLocation(updatedBooking.getPickupLocation());
        existing.setPickupTime(updatedBooking.getPickupTime());
        existing.setDropoffTime(updatedBooking.getDropoffTime());

        Booking saved = bookingRepository.save(existing);
        logger.info("Booking updated: id={}, newStart={}, newEnd={}",
            bookingId, saved.getStartDate(), saved.getEndDate());

        return saved;
    }

    @Transactional
    public Booking createBookingAdmin(Booking booking) {
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        Booking saved = bookingRepository.save(booking);
        logger.info("Admin created booking: id={}, name={}",
            saved.getId(), saved.getFullName());
        return saved;
    }
}