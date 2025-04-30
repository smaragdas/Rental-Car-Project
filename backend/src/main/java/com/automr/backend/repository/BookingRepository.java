package com.automr.backend.repository;

import com.automr.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Custom method: find all bookings that overlap a specific date range
    List<Booking> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate endDate, LocalDate startDate);

    // Count bookings between dates
    Long countByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate endDate, LocalDate startDate);

    // Custom query to delete bookings older than a certain date
    @Transactional
    int deleteBookingsByStartDateBefore(LocalDate date);
}