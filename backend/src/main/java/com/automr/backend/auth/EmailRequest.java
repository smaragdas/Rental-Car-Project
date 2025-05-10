package com.automr.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmailRequest {
    @Email
    @NotBlank
    private String email;

    public EmailRequest() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}