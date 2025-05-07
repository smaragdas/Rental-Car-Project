package com.automr.backend.controller;

import com.automr.backend.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.model.PaymentIntent;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "*") // adjust for production as needed
public class StripeController {

    @Autowired
    private StripeService stripeService;

    /**
     * Legacy PaymentIntent endpoint (returns clientSecret for front‑end elements).
     */
    @PostMapping("/payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(
            @RequestParam int amount,
            @RequestParam String description
    ) throws StripeException {
        PaymentIntent intent = stripeService.createPaymentIntent(amount, description);
        return ResponseEntity.ok(Map.of("clientSecret", intent.getClientSecret()));
    }

    /**
     * Hosted Stripe Checkout session.
     * Front‑end POSTs { amount, successUrl, cancelUrl, metadata } in JSON.
     */
    @PostMapping("/checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(
            @RequestBody CheckoutRequest req
    ) throws StripeException {
        SessionCreateParams.LineItem.PriceData.ProductData product =
            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                .setName("AutoMR Rental")
                .build();

        SessionCreateParams.LineItem.PriceData priceData =
            SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("eur")
                .setUnitAmount(req.getAmount())
                .setProductData(product)
                .build();

        SessionCreateParams.LineItem lineItem =
            SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(priceData)
                .build();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(req.getSuccessUrl())
                .setCancelUrl(req.getCancelUrl())
                .addLineItem(lineItem)
                .putAllMetadata(req.getMetadata())
                .build();

        Session session = stripeService.createCheckoutSession(params);
        return ResponseEntity.ok(Map.of("url", session.getUrl()));
    }

    // DTO for incoming checkout-session requests
    public static class CheckoutRequest {
        private long amount;
        private String successUrl;
        private String cancelUrl;
        private Map<String, String> metadata;

        public long getAmount() { return amount; }
        public void setAmount(long amount) { this.amount = amount; }
        public String getSuccessUrl() { return successUrl; }
        public void setSuccessUrl(String successUrl) { this.successUrl = successUrl; }
        public String getCancelUrl() { return cancelUrl; }
        public void setCancelUrl(String cancelUrl) { this.cancelUrl = cancelUrl; }
        public Map<String, String> getMetadata() { return metadata; }
        public void setMetadata(Map<String, String> metadata) { this.metadata = metadata; }
    }
}