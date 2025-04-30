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

    @PutMapping("/daily-rate")
    public ResponseEntity<String> updateDailyRate(@RequestParam int amount) {
        settingsService.updateDailyRate(amount);
        return ResponseEntity.ok("Daily rate updated to €" + amount);
    }

    @PutMapping("/minimum-days")
    public ResponseEntity<String> updateMinimumDays(@RequestParam int days) {
        settingsService.updateMinimumRentalDays(days);
        return ResponseEntity.ok("Minimum rental days updated to " + days);
    }
}