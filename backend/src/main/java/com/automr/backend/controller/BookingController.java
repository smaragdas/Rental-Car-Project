package com.automr.backend.controller;

import com.automr.backend.model.Booking;
import com.automr.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    /** Public: create a new booking (with Stripe payment) */
    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking) {
        try {
            Booking savedBooking = bookingService.createBooking(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (IllegalArgumentException | IllegalStateException e) {
            // validation or availability errors → 400 Bad Request
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // unexpected → 500 Internal Server Error
            return ResponseEntity.internalServerError()
                                    .body("Something went wrong: " + e.getMessage());
        }
    }

    /** Public: list all bookings */
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    /** Admin: cancel & (partial) refund */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        try {
            Booking cancelled = bookingService.cancelBooking(id);
            return ResponseEntity.ok(cancelled);
        } catch (IllegalArgumentException | IllegalStateException e) {
            // e.g. “not found” or “already cancelled”
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            // e.g. Stripe refund failure → 400
            return ResponseEntity.badRequest().body("Cancellation failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                                    .body("Cancellation failed unexpectedly");
        }
    }

    /** Admin: delete a booking entirely */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok("Booking deleted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** Admin: update booking details (no payment) */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(
            @PathVariable Long id,
            @RequestBody Booking updatedBooking
    ) {
        try {
            Booking result = bookingService.updateBooking(id, updatedBooking);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** Admin: create a booking manually (no Stripe) */
    @PostMapping("/admin")
    public ResponseEntity<?> createBookingAdmin(@RequestBody Booking booking) {
        try {
            Booking saved = bookingService.createBookingAdmin(booking);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                                    .body("Failed to create booking: " + e.getMessage());
        }
    }

    /** 
     * Capture any javax.validation errors from @Valid 
     * and return a concise message. 
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(
            MethodArgumentNotValidException ex
    ) {
        FieldError fieldError = (FieldError) ex.getBindingResult()
                                                .getAllErrors()
                                                .get(0);
        String msg = fieldError.getField() + ": " + fieldError.getDefaultMessage();
        return ResponseEntity.badRequest().body(msg);
    }
}