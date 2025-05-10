package com.automr.backend.model;

import jakarta.persistence.*;

@Entity
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int dailyRate;

    private int minimumRentalDays;

    private int fleetSize;

    public Settings() {
    }

    public Settings(int dailyRate, int minimumRentalDays, int fleetSize) {
        this.dailyRate = dailyRate;
        this.minimumRentalDays = minimumRentalDays;
        this.fleetSize = fleetSize;
    }

    // Getters and Setters

    public Long getId() {
        return id;
        
    } 
    public void setId(Long id) {
        this.id = id;
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

    public int getFleetSize() { 
        return fleetSize; 
    }

    public void setFleetSize(int fleetSize) { 
        this.fleetSize = fleetSize; 
    }
}