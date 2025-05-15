import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import './i18n'
import { AuthProvider } from './context/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { SettingsProvider } from './hooks/useSettings'
import { HelmetProvider } from 'react-helmet-async'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <SettingsProvider>
          <Elements stripe={stripePromise}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Elements>
        </SettingsProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
)
