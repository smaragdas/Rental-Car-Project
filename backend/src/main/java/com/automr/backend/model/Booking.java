package com.automr.backend.model;

import com.automr.backend.validation.ValidPhone;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

import com.automr.backend.validation.ValidPhone;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull
    private LocalDate startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull
    private LocalDate endDate;

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @ValidPhone
    @NotBlank
    private String phone;

    @NotNull
    @Min(value = 24, message = "Driver must be at least 24 years old")
    private Integer age;

<<<<<<< HEAD
=======
    @Column(nullable = true)
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
    private Integer paymentAmount;

    private String pickupLocation;

    private String pickupTime;

    private String dropoffTime;

    private Boolean airportPickup;

    @Enumerated(EnumType.STRING)
<<<<<<< HEAD
=======
    @Column(nullable = true, columnDefinition = "varchar(255) default 'CONFIRMED'")
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
    private BookingStatus bookingStatus = BookingStatus.CONFIRMED;

    private String paymentIntentId;

<<<<<<< HEAD
    public Booking() {}

    // Custom validation logic
    public boolean isValidRentalPeriod() {
        if (startDate != null && endDate != null) {
            long days = ChronoUnit.DAYS.between(startDate, endDate);
            return days >= 4;
        }
        return false;
=======
    @Column(nullable = false)
    private String paymentStatus = "PENDING";

    public Booking() {}

    // ───── Validations ───────────────────────

    @AssertTrue(message = "Start date must be today or in the future")
    public boolean isStartDateValid() {
        return startDate != null && !startDate.isBefore(LocalDate.now());
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
    }

    // ───── Getters and Setters ───────────────

    public Long getId() {
        return id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(Integer paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }

    public String getDropoffTime() {
        return dropoffTime;
    }

    public void setDropoffTime(String dropoffTime) {
        this.dropoffTime = dropoffTime;
    }

    public Boolean getAirportPickup() {
        return airportPickup;
    }

    public void setAirportPickup(Boolean airportPickup) {
        this.airportPickup = airportPickup;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }
<<<<<<< HEAD
=======

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
}