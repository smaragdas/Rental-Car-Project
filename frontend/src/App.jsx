// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import ThankYou from './pages/ThankYou';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import CookiePolicy from './pages/CookiePolicy';
import CookiesBanner from './components/CookiesBanner';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import './i18n';

// ProtectedRoute wrapper for admin routes
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  // Lifted cookie consent state
  const [consent, setConsent] = useState({ given: false });

  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent');
    setConsent(stored ? JSON.parse(stored) : { given: false });
  }, []);

  // Handler: Accept essential cookies only
  const acceptEssential = () => {
    const c = { given: true, categories: ['essential'], timestamp: new Date().toISOString() };
    localStorage.setItem('cookieConsent', JSON.stringify(c));
    setConsent(c);
  };

  // Handler: Accept all cookies
  const acceptAll = () => {
    const c = { given: true, categories: ['essential', 'analytics', 'marketing'], timestamp: new Date().toISOString() };
    localStorage.setItem('cookieConsent', JSON.stringify(c));
    setConsent(c);
  };

  // Determine banner visibility
  const showBanner = !consent.given;

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />

        {/* Cookies consent banner with proper props */}
        <CookiesBanner
          visible={showBanner}
          onAcceptEssential={acceptEssential}
          onAcceptAll={acceptAll}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer can reopen the banner */}
        <Footer onShowCookies={() => setConsent({ given: false })} />
      </div>
    </AuthProvider>
  );
}
