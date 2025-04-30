package com.automr.backend.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

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

        return PaymentIntent.create(params);
    }
}