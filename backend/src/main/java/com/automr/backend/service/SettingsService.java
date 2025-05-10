package com.automr.backend.service;

import com.automr.backend.model.Settings;
import com.automr.backend.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    private static final Long SETTINGS_ID = 1L;

    /**
     * Always returns the singleton settings row with ID = 1.
     * Throws if not initialized.
     */
    @Transactional(readOnly = true)
    public Settings getSettings() {
        return settingsRepository.findById(SETTINGS_ID)
            .orElseThrow(() -> new NoSuchElementException("Settings not initialized"));
    }

    /**
     * Update singleton settings (ID = 1).
     */
    @Transactional
    public Settings updateSettings(Settings updated) {
        Settings s = getSettings();
        s.setDailyRate(updated.getDailyRate());
        s.setMinimumRentalDays(updated.getMinimumRentalDays());
        s.setFleetSize(updated.getFleetSize());
        return settingsRepository.save(s);
    }
}
