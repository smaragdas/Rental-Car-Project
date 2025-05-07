package com.automr.backend.service;

import com.automr.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class BookingCleanupService {

    @Autowired
    private BookingRepository bookingRepository;

    // Scheduled task to delete bookings older than 2 months
    @Scheduled(cron = "0 0 0 * * ?") // Runs every day at midnight (00:00)
    public void deleteOldBookings() {
        LocalDate twoMonthsAgo = LocalDate.now().minusMonths(2);

        // Delete bookings older than 2 months
        int deletedCount = bookingRepository.deleteBookingsByStartDateBefore(twoMonthsAgo);
        System.out.println("Deleted " + deletedCount + " bookings older than 2 months.");
    }
}