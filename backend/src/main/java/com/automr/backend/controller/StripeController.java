package com.automr.backend.controller;

import com.automr.backend.model.BookingStatus;
import com.automr.backend.repository.BookingRepository;
import com.automr.backend.service.EmailService;
import com.automr.backend.service.StripeService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "*")
public class StripeController {

    private static final Logger logger = LoggerFactory.getLogger(StripeController.class);

    @Autowired private StripeService stripeService;
    @Autowired private EmailService emailService;
    @Autowired private BookingRepository bookingRepository;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @PostMapping("/payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(
            @RequestParam int amount,
            @RequestParam String description
    ) throws StripeException {
        PaymentIntent intent = stripeService.createPaymentIntent(amount, description);
        return ResponseEntity.ok(Map.of("clientSecret", intent.getClientSecret()));
    }

    @PostMapping("/checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody CheckoutRequest req)
            throws StripeException {

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

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(HttpServletRequest request) {
        String payload;
        try {
            payload = new String(request.getInputStream().readAllBytes());
        } catch (IOException e) {
            logger.error("❌ Failed to read webhook payload: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payload");
        }

        String sigHeader = request.getHeader("Stripe-Signature");
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            logger.error("❌ Invalid Stripe signature: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }

        logger.info("✅ Stripe event received: {}", event.getType());

        switch (event.getType()) {
            case "checkout.session.completed" -> {
                Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
                if (session != null && session.getMetadata() != null) {
                    String bookingId = session.getMetadata().get("bookingId");
                    bookingRepository.findById(Long.parseLong(bookingId)).ifPresent(booking -> {
                        if (!"PAID".equalsIgnoreCase(booking.getPaymentStatus())) {
                            booking.setBookingStatus(BookingStatus.PAID);
                            booking.setPaymentStatus("PAID");
                            booking.setPaymentIntentId(session.getPaymentIntent());
                            bookingRepository.save(booking);
                            logger.info("✅ Booking {} marked as PAID", booking.getId());

                            // Send styled confirmation email via Thymeleaf
                            emailService.sendBookingConfirmationEmail(booking,
                                    booking.getStartDate().until(booking.getEndDate()).getDays() + 1);
                        }
                    });
                }
            }

            case "payment_intent.payment_failed" -> {
                PaymentIntent intent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                if (intent != null && intent.getMetadata() != null) {
                    String bookingId = intent.getMetadata().get("bookingId");
                    bookingRepository.findById(Long.parseLong(bookingId)).ifPresent(booking -> {
                        booking.setPaymentStatus("FAILED");
                        bookingRepository.save(booking);
                        logger.warn("⚠️ Booking {} marked as FAILED", booking.getId());
                    });
                }
            }

            default -> logger.info("ℹ️ Unhandled event type: {}", event.getType());
        }

        return ResponseEntity.ok("Webhook handled");
    }

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