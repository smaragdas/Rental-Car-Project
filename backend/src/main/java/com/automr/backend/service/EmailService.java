package com.automr.backend.service;

import com.automr.backend.model.Booking;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendHtmlEmail(String toEmail, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("auto.mercedes21@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // HTML enabled

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }

    public void sendBookingConfirmationEmail(Booking booking, long rentalDays) {
        Context context = new Context();
        context.setVariable("fullName", booking.getFullName());
        context.setVariable("startDate", booking.getStartDate());
        context.setVariable("endDate", booking.getEndDate());
        context.setVariable("days", rentalDays);
        context.setVariable("total", booking.getPaymentAmount());
        context.setVariable("pickupLocation", 
            booking.getPickupLocation() != null ? booking.getPickupLocation() : "N/A");
        context.setVariable("pickupTime", 
            booking.getPickupTime() != null ? booking.getPickupTime() : "N/A");
        context.setVariable("dropoffTime", 
            booking.getDropoffTime() != null ? booking.getDropoffTime() : "N/A");
        context.setVariable("status", booking.getBookingStatus().name());

        String html = templateEngine.process("booking-confirmation.html", context);
        sendHtmlEmail(booking.getEmail(), "Booking Confirmation - AutoMR", html);
    }

    public void sendBookingCancellationEmail(Booking booking, String refundInfo) {
        Context context = new Context();
        context.setVariable("fullName", booking.getFullName());
        context.setVariable("startDate", booking.getStartDate());
        context.setVariable("endDate", booking.getEndDate());
        context.setVariable("status", "CANCELLED");
        context.setVariable("refundInfo", refundInfo != null ? refundInfo : "");

        String html = templateEngine.process("booking-cancellation.html", context);
        sendHtmlEmail(booking.getEmail(), "Booking Cancelled - AutoMR", html);
    }

    public void sendPasswordResetToken(String email, String token) {
        Context context = new Context();
        context.setVariable("token", token);

        String html = templateEngine.process("password-reset.html", context);
        sendHtmlEmail(email, "Password Reset Token - AutoMR", html);
    }
}