package com.automr.backend.controller;

import com.automr.backend.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "*") // Allow all origins for frontend (adjust later for security)
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestParam int amount, @RequestParam String description) {
        try {
            PaymentIntent intent = stripeService.createPaymentIntent(amount, description);
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(500).body("Stripe error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Internal server error: " + e.getMessage());
        }
    }
}