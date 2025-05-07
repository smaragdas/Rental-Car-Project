package com.automr.backend.controller;

import com.automr.backend.model.Settings;
import com.automr.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @GetMapping
    public ResponseEntity<Settings> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    @PutMapping
    public ResponseEntity<Settings> updateSettings(@RequestBody Settings updatedSettings) {
        // applies your two‐step update logic
        settingsService.updateDailyRate(updatedSettings.getDailyRate());
        settingsService.updateMinimumRentalDays(updatedSettings.getMinimumRentalDays());
        settingsService.updateFleetSize(updatedSettings.getFleetSize());
        // then return the refreshed singleton
        return ResponseEntity.ok(settingsService.getSettings());
    }
}