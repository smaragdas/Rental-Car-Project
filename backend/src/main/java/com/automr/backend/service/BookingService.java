package com.automr.backend.service;

import com.automr.backend.model.Booking;
import com.automr.backend.model.Settings;
import com.automr.backend.repository.BookingRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    private static final int MAX_BOOKINGS_PER_DAY = 3;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private StripeService stripeService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SettingsService settingsService;

    

    @Transactional
    public Booking createBooking(Booking booking) {
        // Load current settings
        Settings settings = settingsService.getSettings();

        // Validate age
        if (booking.getAge() < 24) {
            throw new IllegalArgumentException("Driver must be at least 24 years old.");
        }

        // Validate rental period using settings
        long rentalDays = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate());
        if (rentalDays < settings.getMinimumRentalDays()) {
            throw new IllegalArgumentException("Minimum rental period is " + settings.getMinimumRentalDays() + " days.");
        }

        // Check availability
        long overlappingBookings = bookingRepository.countByStartDateLessThanEqualAndEndDateGreaterThanEqual(
                booking.getEndDate(),
                booking.getStartDate()
        );

        if (overlappingBookings >= MAX_BOOKINGS_PER_DAY) {
            throw new IllegalStateException("No cars available for the selected dates.");
        }

        // Calculate payment based on settings
        int totalAmount = (int) rentalDays * settings.getDailyRate();
        booking.setPaymentAmount(totalAmount);

        // Create Stripe payment intent
        try {
            PaymentIntent intent = stripeService.createPaymentIntent(totalAmount, "AutoMR Booking: " + rentalDays + " days");
            System.out.println("Stripe PaymentIntent created: " + intent.getId());
            System.out.println("Client secret: " + intent.getClientSecret());
        } catch (StripeException e) {
            throw new RuntimeException("Stripe payment failed: " + e.getMessage());
        }

        // Save booking
        Booking savedBooking = bookingRepository.save(booking);

        // Send email
        emailService.sendBookingConfirmation(
                savedBooking.getEmail(),
                "Booking Confirmation - AutoMR",
                "Dear " + savedBooking.getFullName() + ",\n\n" +
                        "Your booking from " + savedBooking.getStartDate() + " to " + savedBooking.getEndDate() +
                        " has been confirmed.\n\n" +
                        "Total: €" + savedBooking.getPaymentAmount() + "\n\n" +
                        "Thank you,\nThe AutoMR Team"
        );

        return savedBooking;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}