package com.automr.backend.controller;

import com.automr.backend.auth.EmailRequest;
import com.automr.backend.auth.ResetRequest;
import com.automr.backend.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public String sendResetToken(@Valid @RequestBody EmailRequest request) {
        passwordResetService.generateAndSendResetToken(request.getEmail());
        return "Reset token sent to your email.";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@Valid @RequestBody ResetRequest request) {
        passwordResetService.verifyTokenAndChangePassword(
            request.getEmail(),
            request.getCode(),
            request.getNewPassword()
        );
        return "Password reset successful.";
    }
}