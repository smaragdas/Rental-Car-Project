package com.automr.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotNull
    @Min(value = 24, message = "Driver must be at least 24 years old")
    private Integer age;

    @NotNull
    private Integer paymentAmount;

    private String pickupTime;

    private String dropoffTime;

    private Boolean airportPickup;

    public Booking() {}

    // Custom validation logic inside a helper method
    public boolean isValidRentalPeriod() {
        if (startDate != null && endDate != null) {
            long days = ChronoUnit.DAYS.between(startDate, endDate);
            return days >= 4;
        }
        return false;
    }

    // --- Getters and Setters ---

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
}