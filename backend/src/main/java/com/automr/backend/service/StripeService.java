package com.automr.backend.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.RefundCreateParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    private static final Logger logger = LoggerFactory.getLogger(StripeService.class);

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

    public void refundPartial(String paymentIntentId, int amountInEuros) throws StripeException {
        long amountInCents = amountInEuros * 100L;
    
        RefundCreateParams params = RefundCreateParams.builder()
                .setPaymentIntent(paymentIntentId)
                .setAmount(amountInCents)
                .build();
    
        Refund.create(params); // No need to store it if not used
        logger.info("Stripe refund issued: paymentIntentId={}, refundAmount={}€", paymentIntentId, amountInEuros);
    }
}