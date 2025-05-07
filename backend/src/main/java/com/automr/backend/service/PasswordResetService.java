package com.automr.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Duration;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PasswordResetService {

    private record CodeInfo(String code, Instant expiresAt) {}

    private static final String ADMIN_EMAIL = "automr.mercedes21@gmail.com";

    private final Map<String, CodeInfo> codes = new ConcurrentHashMap<>();

    @Autowired
    private EmailService emailService;

    @Autowired
    private InMemoryUserDetailsManager userDetailsService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void generateAndSendResetCode(String email) {
        if (!email.equalsIgnoreCase(ADMIN_EMAIL)) {
            throw new IllegalArgumentException("Unauthorized email address.");
        }

        String code = String.format("%06d", new Random().nextInt(999999));
        codes.put(email, new CodeInfo(code, Instant.now().plus(Duration.ofMinutes(15))));

        String body = "Your password reset code is: " + code + "\nIt expires in 15 minutes.";
        emailService.sendBookingConfirmation(email, "Password Reset Code", body);
    }

    public void verifyCodeAndChangePassword(String email, String code, String newPassword) {
        if (!email.equalsIgnoreCase(ADMIN_EMAIL)) {
            throw new IllegalArgumentException("Unauthorized email address.");
        }

        CodeInfo info = codes.get(email);
        if (info == null || Instant.now().isAfter(info.expiresAt())) {
            throw new IllegalArgumentException("Reset code expired or not found");
        }

        if (!info.code().equals(code)) {
            throw new IllegalArgumentException("Invalid reset code");
        }

        var user = userDetailsService.loadUserByUsername("admin");
        var updated = User.withUserDetails(user)
                .password(passwordEncoder.encode(newPassword))
                .build();
        userDetailsService.updateUser(updated);

        codes.remove(email); // Invalidate the used code
    }
}