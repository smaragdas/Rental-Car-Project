package com.automr.backend.service;

import com.automr.backend.model.Booking;
import com.automr.backend.model.BookingStatus;
import com.automr.backend.model.Settings;
import com.automr.backend.repository.BookingRepository;
<<<<<<< HEAD
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
=======
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
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
<<<<<<< HEAD
    private static final int MAX_BOOKINGS_PER_DAY = 3;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private StripeService stripeService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SettingsService settingsService;
=======
    private static final ZoneId ZONE_ATHENS = ZoneId.of("Europe/Athens");

    @Autowired private BookingRepository bookingRepository;
    @Autowired private StripeService stripeService;
    @Autowired private EmailService emailService;
    @Autowired private SettingsService settingsService;
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

    @Transactional
    public Booking createBooking(Booking booking) {
        Settings settings = settingsService.getSettings();

<<<<<<< HEAD
=======
        if (booking.getStartDate().isBefore(LocalDate.now(ZONE_ATHENS))) {
            throw new IllegalArgumentException("Start date must be today or in the future.");
        }

>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
        if (booking.getAge() < 24) {
            throw new IllegalArgumentException("Driver must be at least 24 years old.");
        }

<<<<<<< HEAD
        long rentalDays = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate());
=======
        long rentalDays = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate()) + 1;
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
        if (rentalDays < settings.getMinimumRentalDays()) {
            throw new IllegalArgumentException("Minimum rental period is " + settings.getMinimumRentalDays() + " days.");
        }

        long overlapping = bookingRepository.countByStartDateLessThanEqualAndEndDateGreaterThanEqual(
<<<<<<< HEAD
                booking.getEndDate(), booking.getStartDate());

        if (overlapping >= MAX_BOOKINGS_PER_DAY) {
            throw new IllegalStateException("No cars available for the selected dates.");
        }

        int totalAmount = (int) rentalDays * settings.getDailyRate();
        booking.setPaymentAmount(totalAmount);

        try {
            PaymentIntent intent = stripeService.createPaymentIntent(totalAmount, "AutoMR Booking: " + rentalDays + " days");
            booking.setPaymentIntentId(intent.getId());
        } catch (StripeException e) {
            logger.error("Stripe PaymentIntent creation failed: {}", e.getMessage());
            throw new RuntimeException("Stripe payment failed: " + e.getMessage());
        }

        Booking saved = bookingRepository.save(booking);

        logger.info("Booking created: id={}, name={}, email={}, amount={}€",
                saved.getId(), saved.getFullName(), saved.getEmail(), saved.getPaymentAmount());

        emailService.sendBookingConfirmation(
                saved.getEmail(),
                "Booking Confirmation - AutoMR",
                "Dear " + saved.getFullName() + ",\n\n" +
                        "Your booking from " + saved.getStartDate() + " to " + saved.getEndDate() +
                        " has been confirmed.\n\nTotal: €" + saved.getPaymentAmount() +
                        "\n\nThank you,\nThe AutoMR Team"
        );

=======
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
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
        return saved;
    }

    public List<Booking> getAllBookings() {
        logger.info("Retrieving all bookings");
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
<<<<<<< HEAD
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
=======
            .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

<<<<<<< HEAD
        if (booking.getPaymentIntentId() == null) {
            throw new IllegalStateException("No payment intent found for this booking.");
        }

        try {
            int refundAmount = booking.getPaymentAmount() / 2;
            stripeService.refundPartial(booking.getPaymentIntentId(), refundAmount);
            logger.info("Booking cancelled: id={}, refunded={}€", bookingId, refundAmount);
        } catch (Exception e) {
            logger.error("Refund failed for booking id={}: {}", bookingId, e.getMessage());
            throw new RuntimeException("Refund failed: " + e.getMessage());
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        Booking updated = bookingRepository.save(booking);

        emailService.sendBookingConfirmation(
                updated.getEmail(),
                "Booking Cancellation - AutoMR",
                "Dear " + updated.getFullName() + ",\n\n" +
                        "Your booking from " + updated.getStartDate() + " to " + updated.getEndDate() +
                        " has been cancelled.\n\nWe have refunded 50% of your payment: €" +
                        (updated.getPaymentAmount() / 2) + ".\n\nThank you,\nThe AutoMR Team"
        );

=======
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
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
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
<<<<<<< HEAD
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
=======
            .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        if (existing.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Cannot update a cancelled booking.");
        }
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

        existing.setFullName(updatedBooking.getFullName());
        existing.setEmail(updatedBooking.getEmail());
        existing.setPhone(updatedBooking.getPhone());
        existing.setStartDate(updatedBooking.getStartDate());
        existing.setEndDate(updatedBooking.getEndDate());
        existing.setAge(updatedBooking.getAge());
<<<<<<< HEAD
        existing.setPickupTime(updatedBooking.getPickupTime());
        existing.setDropoffTime(updatedBooking.getDropoffTime());
        existing.setAirportPickup(updatedBooking.getAirportPickup());

        Booking saved = bookingRepository.save(existing);
        logger.info("Booking updated: id={}, newStart={}, newEnd={}",
                bookingId, saved.getStartDate(), saved.getEndDate());
=======
        existing.setAirportPickup(updatedBooking.getAirportPickup());
        existing.setPickupLocation(updatedBooking.getPickupLocation());
        existing.setPickupTime(updatedBooking.getPickupTime());
        existing.setDropoffTime(updatedBooking.getDropoffTime());

        Booking saved = bookingRepository.save(existing);
        logger.info("Booking updated: id={}, start={}, end={}", bookingId, saved.getStartDate(), saved.getEndDate());
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

        return saved;
    }

    @Transactional
    public Booking createBookingAdmin(Booking booking) {
        booking.setBookingStatus(BookingStatus.CONFIRMED);
<<<<<<< HEAD
=======
        booking.setPaymentStatus("MANUAL");
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
        Booking saved = bookingRepository.save(booking);
        logger.info("Admin created booking: id={}, name={}", saved.getId(), saved.getFullName());
        return saved;
    }
}