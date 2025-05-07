package com.automr.backend.service;

import com.automr.backend.model.Settings;
import com.automr.backend.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    /**
     * Always returns the one-and-only settings row (creating it if it doesn't exist).
     */
    public Settings getSettings() {
        return settingsRepository.findAll().stream()
            .findFirst()
            .orElseGet(() -> {
                Settings defaultSettings = new Settings();
                defaultSettings.setDailyRate(50);
                defaultSettings.setMinimumRentalDays(4);
                defaultSettings.setFleetSize(3);
                return settingsRepository.save(defaultSettings);
            });
    }

    @Transactional
    public void updateDailyRate(int newRate) {
        Settings s = getSettings();
        s.setDailyRate(newRate);
        settingsRepository.save(s);
    }

    @Transactional
    public void updateMinimumRentalDays(int newMinDays) {
        Settings s = getSettings();
        s.setMinimumRentalDays(newMinDays);
        settingsRepository.save(s);
    }

    @Transactional
    public void updateFleetSize(int newFleetSize) {
        Settings s = getSettings();
        s.setFleetSize(newFleetSize);
        settingsRepository.save(s);
    }
}
