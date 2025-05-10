// src/main/java/com/automr/backend/config/DataInitializer.java
package com.automr.backend.config;

import com.automr.backend.model.Settings;
import com.automr.backend.repository.SettingsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initSettings(SettingsRepository settingsRepository) {
        return args -> {
            final long SETTINGS_ID = 1L;
            // If no row with ID=1 exists, create one. Do NOT set the ID explicitly—
            // let the database auto-generate it (it will start at 1).
            if (!settingsRepository.existsById(SETTINGS_ID)) {
                Settings defaults = new Settings();
                defaults.setDailyRate(50);
                defaults.setMinimumRentalDays(4);
                defaults.setFleetSize(3);
                settingsRepository.save(defaults);
                System.out.println("✅ Created default settings row");
            }
        };
    }
}