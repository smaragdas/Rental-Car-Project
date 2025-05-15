// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CookiesBanner from './components/CookiesBanner';
import './i18n';
import { useAuth } from './context/AuthContext';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Booking = lazy(() => import('./pages/Booking'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Admin = lazy(() => import('./pages/Admin'));

// ProtectedRoute wrapper for admin routes
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const [consent, setConsent] = useState({ given: false });

  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent');
    setConsent(stored ? JSON.parse(stored) : { given: false });
  }, []);

  const acceptEssential = () => {
    const c = { given: true, categories: ['essential'], timestamp: new Date().toISOString() };
    localStorage.setItem('cookieConsent', JSON.stringify(c));
    setConsent(c);
  };

  const acceptAll = () => {
    const c = { given: true, categories: ['essential', 'analytics', 'marketing'], timestamp: new Date().toISOString() };
    localStorage.setItem('cookieConsent', JSON.stringify(c));
    setConsent(c);
  };

  const showBanner = !consent.given;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <CookiesBanner
        visible={showBanner}
        onAcceptEssential={acceptEssential}
        onAcceptAll={acceptAll}
      />

      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={<ProtectedRoute><Admin /></ProtectedRoute>}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer onShowCookies={() => setConsent({ given: false })} />
    </div>
  );
}
