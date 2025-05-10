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
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);
    private static final ZoneId ZONE_ATHENS = ZoneId.of("Europe/Athens");

    @Autowired private BookingRepository bookingRepository;
    @Autowired private StripeService stripeService;
    @Autowired private EmailService emailService;
    @Autowired private SettingsService settingsService;

    @Transactional
    public Booking createBooking(Booking booking) {
        Settings settings = settingsService.getSettings();

        if (booking.getStartDate().isBefore(LocalDate.now(ZONE_ATHENS))) {
            throw new IllegalArgumentException("Start date must be today or in the future.");
        }

        if (booking.getAge() < 24) {
            throw new IllegalArgumentException("Driver must be at least 24 years old.");
        }

        long rentalDays = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate()) + 1;
        if (rentalDays < settings.getMinimumRentalDays()) {
            throw new IllegalArgumentException("Minimum rental period is " + settings.getMinimumRentalDays() + " days.");
        }

        long overlapping = bookingRepository.countByStartDateLessThanEqualAndEndDateGreaterThanEqual(
            booking.getEndDate(), booking.getStartDate()
        );
        if (overlapping >= settings.getFleetSize()) {
            throw new IllegalStateException("No cars available for the selected dates.");
        }

        if (Boolean.TRUE.equals(booking.getAirportPickup())) {
            if (booking.getPickupLocation() == null ||
                booking.getPickupTime() == null ||
                booking.getDropoffTime() == null) {
                throw new IllegalArgumentException("Pickup location and times must be provided for airport pickup.");
            }
        }

        int totalAmount = (int) rentalDays * settings.getDailyRate();
        booking.setPaymentAmount(totalAmount);

        if (booking.getPaymentIntentId() == null) {
            try {
                var intent = stripeService.createPaymentIntent(totalAmount, "AutoMR Booking: " + rentalDays + " days");
                booking.setPaymentIntentId(intent.getId());
            } catch (Exception e) {
                logger.error("Stripe payment failed: {}", e.getMessage());
                throw new RuntimeException("Stripe payment failed: " + e.getMessage());
            }
        }

        booking.setPaymentStatus("PENDING");
        Booking saved = bookingRepository.save(booking);
        logger.info("Booking created: id={}, name={}, amount={}€", saved.getId(), saved.getFullName(), saved.getPaymentAmount());

        emailService.sendBookingConfirmationEmail(saved, rentalDays);
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

        if (booking.getPaymentIntentId() != null && "PAID".equalsIgnoreCase(booking.getPaymentStatus())) {
            try {
                int refundAmount = booking.getPaymentAmount() / 2;
                stripeService.refundPartial(booking.getPaymentIntentId(), refundAmount);
                logger.info("Refunded 50%% for booking id={}, amount={}€", bookingId, refundAmount);
            } catch (Exception e) {
                logger.error("Refund failed for booking id={}: {}", bookingId, e.getMessage());
                throw new RuntimeException("Refund failed: " + e.getMessage());
            }
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        booking.setPaymentStatus("REFUNDED");
        Booking updated = bookingRepository.save(booking);

        String refundInfo = booking.getPaymentIntentId() != null
                ? "50% refund issued: €" + (booking.getPaymentAmount() / 2)
                : "No payment to refund.";

        emailService.sendBookingCancellationEmail(updated, refundInfo);
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

        if (existing.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Cannot update a cancelled booking.");
        }

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
        logger.info("Booking updated: id={}, start={}, end={}", bookingId, saved.getStartDate(), saved.getEndDate());

        return saved;
    }

    @Transactional
    public Booking createBookingAdmin(Booking booking) {
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        booking.setPaymentStatus("MANUAL");
        Booking saved = bookingRepository.save(booking);
        logger.info("Admin created booking: id={}, name={}", saved.getId(), saved.getFullName());
        return saved;
    }
}