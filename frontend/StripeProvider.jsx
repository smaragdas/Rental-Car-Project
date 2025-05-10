import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements }    from '@stripe/react-stripe-js';
import App             from './App.jsx';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripeProvider() {
    return (
        <Elements stripe={stripePromise}>
        <App />
        </Elements>
    );
}