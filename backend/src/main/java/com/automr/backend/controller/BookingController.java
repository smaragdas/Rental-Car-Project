package com.automr.backend.controller;

import com.automr.backend.model.Booking;
import com.automr.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking) {
        try {
            Booking savedBooking = bookingService.createBooking(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(e.getMessage()); // Conflict
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
}