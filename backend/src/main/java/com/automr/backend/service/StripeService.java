package com.automr.backend.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
<<<<<<< HEAD
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.RefundCreateParams;
=======
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.RefundCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    private static final Logger logger = LoggerFactory.getLogger(StripeService.class);

<<<<<<< HEAD
=======
    /**
     * Legacy: create a PaymentIntent (for Elements or Automatic PMM).
     */
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
    public PaymentIntent createPaymentIntent(int amountInEuros, String description) throws StripeException {
        long amountInCents = amountInEuros * 100L;

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount(amountInCents)
            .setCurrency("eur")
            .setDescription(description)
            .setAutomaticPaymentMethods(
                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                    .setEnabled(true)
                    .build()
            )
            .build();

        PaymentIntent intent = PaymentIntent.create(params);
        logger.info("Stripe PaymentIntent created: id={}, amount={}€", intent.getId(), amountInEuros);
        return intent;
    }

<<<<<<< HEAD
    public void refundPartial(String paymentIntentId, int amountInEuros) throws StripeException {
        long amountInCents = amountInEuros * 100L;
    
        RefundCreateParams params = RefundCreateParams.builder()
                .setPaymentIntent(paymentIntentId)
                .setAmount(amountInCents)
                .build();
    
        Refund.create(params); // No need to store it if not used
=======
    /**
     * Hosted Checkout: create a Checkout Session.
     */
    public Session createCheckoutSession(SessionCreateParams params) throws StripeException {
        Session session = Session.create(params);
        logger.info("Stripe Checkout Session created: id={}", session.getId());
        return session;
    }

    /**
     * Partial refund via PaymentIntent.
     */
    public void refundPartial(String paymentIntentId, int amountInEuros) throws StripeException {
        long amountInCents = amountInEuros * 100L;

        RefundCreateParams params = RefundCreateParams.builder()
            .setPaymentIntent(paymentIntentId)
            .setAmount(amountInCents)
            .build();

        Refund.create(params);
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
        logger.info("Stripe refund issued: paymentIntentId={}, refundAmount={}€", paymentIntentId, amountInEuros);
    }
}