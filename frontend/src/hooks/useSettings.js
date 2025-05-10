// src/hooks/useSettings.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import publicAxios from '../lib/publicAxios';

// 1. Create a Context to hold settings
const SettingsContext = createContext(null);

// 2. Provider component fetches settings once and makes them available
export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        publicAxios.get('/settings')
        .then(res => setSettings(res.data))
        .catch(err => {
            console.error('Failed to load settings', err);
            // Fallback defaults if the API call fails
            setSettings({ dailyRate: 50, minimumRentalDays: 2, fleetSize: 3 });
        });
    }, []);

    // Show a simple loading state until settings are ready
    if (settings === null) {
        return <p>Loading settings…</p>;
    }

    return (
        <SettingsContext.Provider value={settings}>
        {children}
        </SettingsContext.Provider>
    );
    }

    // 3. Custom hook to access settings in any component
    export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within SettingsProvider');
    }
    return context;
}
