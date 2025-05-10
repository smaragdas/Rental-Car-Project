// src/pages/TermsAndConditions.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TermsAndConditions({ onClose }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClose = onClose || (() => navigate(-1));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
        >
            {/* Header */}
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <h1 className="text-2xl font-semibold text-white">{t('terms.title')}</h1>
            <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 text-2xl leading-none"
                aria-label={t('button.back')}
            >
                &times;
            </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
            <article className="font-serif space-y-8">
                {/* 1. Definitions */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">1. Definitions</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>“Day”</strong> means any consecutive 24-hour period (or portion thereof)
                    beginning at the scheduled pickup time; daily rates apply per Day regardless of usage.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>“Vehicle”</strong> means the motor vehicle described in your rental agreement.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    <strong>“Driver”</strong> means the person named on the rental agreement,
                    holding a valid driver’s license.
                </p>
                </section>

                {/* 2. Eligibility & Experience */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">2. Eligibility & Experience</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Drivers must be at least <strong>24 years old</strong>.</li>
                    <li>Must hold a valid driver’s license for <strong>4+ years</strong>.</li>
                    <li>Present an unexpired government-issued license and a secondary photo ID.</li>
                    <li>Major credit card required (debit cards not accepted).</li>
                    <li>Free pickup from any public transport hub within 5 km.</li>
                </ul>
                </section>

                {/* 3. Rental Period & Charges */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">3. Rental Period & Charges</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Quoted daily rate per 24-hour Day; partial days count as a full Day.</li>
                    <li>Minimum rental period dynamically set from system settings.</li>
                    <li>Unlimited mileage unless otherwise stated.</li>
                    <li>No airport concession or licensing fees.</li>
                </ul>
                </section>

                {/* 4. Payment & Deposits */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">4. Payment & Deposits</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>€800 security deposit hold at pickup.</li>
                    <li>CDW covers repair costs beyond the €800 deposit.</li>
                    <li>Hold released within 7 days if no charges apply.</li>
                    <li>All local taxes included; no hidden fees.</li>
                </ul>
                </section>

                {/* 5. Insurance & Liability */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">5. Insurance & Liability</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Standard third-party liability per local law.</li>
                    <li>Exclusions: unauthorized use, DUI, off-road, racing.</li>
                </ul>
                </section>

                {/* 6. Use Restrictions */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">6. Use Restrictions</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Private use only—no commercial activities or ride-sharing.</li>
                    <li>Only drivers named on the agreement may operate.</li>
                </ul>
                </section>

                {/* 7. Fuel Policy */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">7. Fuel Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                    Vehicles delivered full-tank; must be returned full or a fuel charge plus
                    €10 service fee applies.
                </p>
                </section>

                {/* 8. Cancellation & No-Show */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">8. Cancellation & No-Show</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Free cancellation up to 48 hours before pickup.</li>
                    <li>Late cancellation (48–24h) incurs one Day’s rental fee.</li>
                    <li>No-show incurs one Day’s rental fee.</li>
                </ul>
                </section>

                {/* 9. Privacy & Data Retention */}
                <section className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">9. Privacy & Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                    We collect full name, email, and phone number to process your booking.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                    Some data we collect may be considered personal and are protected under
                    Regulation (EU) 2016/679 (GDPR).
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Data retained for two months post-rental for service, disputes, and compliance.
                </p>
                </section>

                {/* 10. Governing Law & Dispute Resolution */}
                <section className="mb-8">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">10. Governing Law & Dispute Resolution</h2>
                <p className="text-gray-700 leading-relaxed">
                    These Terms are governed by the laws of the rental jurisdiction. Disputes shall be
                    resolved in the competent courts of that jurisdiction.
                </p>
                </section>
            </article>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 text-right">
            <button
                onClick={handleClose}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
                Close
            </button>
            </div>
        </motion.div>
        </div>
    );
}
