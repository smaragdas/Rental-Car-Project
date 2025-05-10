// src/pages/CookiePolicy.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Cookie Policy</h1>
            <button
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                aria-label="Close"
            >
                &times;
            </button>
            </div>

            {/* Content */}
            <div className="space-y-6 text-gray-800">
            <p>
                This Cookie Policy explains how <strong>AutoMr</strong> uses cookies and similar
                tracking technologies on our website. By using our site, you consent to the use of cookies
                as described in this policy.
            </p>

            <section>
                <h2 className="text-xl font-semibold mb-2">What are Cookies?</h2>
                <p>
                Cookies are small text files placed on your device when you visit a website.
                They help the site recognize your device, remember your preferences, and
                improve your experience by providing personalized content and features.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Essential Cookies</h2>
                <ul className="list-disc pl-5 space-y-1">
                <li><strong>session_id</strong>: Maintains your session state. Expires when you close your browser.</li>
                <li><strong>cookieConsent</strong>: Stores your cookie consent choices. Expires in 12 months.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Analytics Cookies</h2>
                <ul className="list-disc pl-5 space-y-1">
                <li><strong>_ga, _gid</strong>: Google Analytics cookies that collect anonymous visitor behavior data. Expires in 2 years.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Marketing Cookies</h2>
                <ul className="list-disc pl-5 space-y-1">
                <li><strong>_fbp</strong>: Facebook pixel cookie for marketing on Facebook and Instagram. Expires in 3 months.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Manage Your Cookie Preferences</h2>
                <p>
                You can change or withdraw your consent to non-essential cookies anytime by
                clicking the Cookie Settings link in the footer of any page.
                </p>
            </section>
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex justify-end space-x-3">
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
            >
                Close
            </button>
            <Link
                to="/"
                className="px-4 py-2 bg-[#1D3A6C] text-white rounded hover:bg-[#163059] transition"
            >
                Back to Home
            </Link>
            </div>
        </motion.div>
        </div>
    );
}
