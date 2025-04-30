package com.automr.backend.service;

import com.automr.backend.model.Settings;
import com.automr.backend.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    // Load settings (or default if not present)
    public Settings getSettings() {
        return settingsRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> {
                    Settings defaultSettings = new Settings(50, 4); // €50/day, 4-day minimum
                    return settingsRepository.save(defaultSettings);
                });
    }

    public void updateDailyRate(int newRate) {
        Settings settings = getSettings();
        settings.setDailyRate(newRate);
        settingsRepository.save(settings);
    }

    public void updateMinimumRentalDays(int newMinDays) {
        Settings settings = getSettings();
        settings.setMinimumRentalDays(newMinDays);
        settingsRepository.save(settings);
    }
}