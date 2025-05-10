// src/components/CookiesBanner.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function CookiesBanner({
    visible,
    onAcceptEssential,
    onAcceptAll,
    }) {
    const { t } = useTranslation();
    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 z-50">
        <p className="text-sm md:text-base">
            {t('cookies.message')}
            {' '}
            <Link to="/cookie-policy" className="underline hover:text-gray-300">
            {t('cookies.learnMore')}
            </Link>
            .
        </p>
        <div className="flex space-x-2">
            <button
            onClick={onAcceptEssential}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
            >
            {t('cookies.acceptEssential')}
            </button>
            <button
            onClick={onAcceptAll}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm"
            >
            {t('cookies.acceptAll')}
            </button>
        </div>
        </div>
    );
}