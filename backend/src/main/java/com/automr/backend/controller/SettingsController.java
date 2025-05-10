package com.automr.backend.controller;

import com.automr.backend.model.Settings;
import com.automr.backend.service.SettingsService;

import jakarta.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @PermitAll
    @GetMapping
    public ResponseEntity<Settings> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    @PutMapping
    public ResponseEntity<Settings> updateSettings(@RequestBody Settings updatedSettings) {
        Settings savedSettings = settingsService.updateSettings(updatedSettings);
        return ResponseEntity.ok(savedSettings);
    }
}