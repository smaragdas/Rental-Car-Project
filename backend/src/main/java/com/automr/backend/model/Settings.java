package com.automr.backend.model;

import jakarta.persistence.*;

@Entity
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int dailyRate;

    private int minimumRentalDays;

    public Settings() {
    }

    public Settings(int dailyRate, int minimumRentalDays) {
        this.dailyRate = dailyRate;
        this.minimumRentalDays = minimumRentalDays;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public int getDailyRate() {
        return dailyRate;
    }

    public void setDailyRate(int dailyRate) {
        this.dailyRate = dailyRate;
    }

    public int getMinimumRentalDays() {
        return minimumRentalDays;
    }

    public void setMinimumRentalDays(int minimumRentalDays) {
        this.minimumRentalDays = minimumRentalDays;
    }
}