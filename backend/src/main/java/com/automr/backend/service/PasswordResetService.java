package com.automr.backend.service;

import com.automr.backend.model.PasswordResetToken;
import com.automr.backend.repository.PasswordResetTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Service
public class PasswordResetService {

    private static final Logger logger = LoggerFactory.getLogger(PasswordResetService.class);

    @Value("${spring.mail.username}")
    private String adminEmail;

    @Value("${admin.username}")
    private String adminUsername;

    @Autowired
    private EmailService emailService;

    @Autowired
    private InMemoryUserDetailsManager userDetailsService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void generateAndSendResetToken(String email) {
        if (!email.trim().equalsIgnoreCase(adminEmail.trim())) {
            throw new IllegalArgumentException("Unauthorized email address.");
        }

        // Invalidate previous tokens
        tokenRepository.deleteByEmail(email);

        String token = UUID.randomUUID().toString();
        Instant expiresAt = Instant.now().plus(Duration.ofMinutes(15));

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpiresAt(expiresAt);
        tokenRepository.save(resetToken);

        logger.info("✅ Password reset token generated for {}", email);

        // Use Thymeleaf template for email
        emailService.sendPasswordResetToken(email, token);
    }

    public void verifyTokenAndChangePassword(String email, String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new IllegalArgumentException("Invalid reset token."));

        if (!resetToken.getEmail().equalsIgnoreCase(email)) {
            throw new IllegalArgumentException("Token does not match email.");
        }

        if (Instant.now().isAfter(resetToken.getExpiresAt())) {
            throw new IllegalArgumentException("Reset token has expired.");
        }

        var user = userDetailsService.loadUserByUsername(adminUsername);
        var updatedUser = User.withUserDetails(user)
                .password(passwordEncoder.encode(newPassword))
                .build();
        userDetailsService.updateUser(updatedUser);

        logger.info("✅ Admin password updated for {}", adminUsername);

        tokenRepository.delete(resetToken);
    }
}