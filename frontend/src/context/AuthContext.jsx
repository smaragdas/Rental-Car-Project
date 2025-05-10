// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import publicAxios from '../lib/publicAxios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize auth state from localStorage
    const [auth, setAuth] = useState(() => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) return { token: null, expiresAt: null };
        try {
        const { exp } = jwtDecode(jwt);
        return { token: jwt, expiresAt: exp * 1000 };
        } catch {
        return { token: null, expiresAt: null };
        }
    });

    const { token, expiresAt } = auth; // destructure for dependencies

    // Login: fetch token, store, and decode expiry
    const login = async (username, password) => {
        const res = await publicAxios.post('/auth/login', { username, password });
        const jwt = res.data.token;
        const { exp } = jwtDecode(jwt);
        localStorage.setItem('jwt', jwt);
        setAuth({ token: jwt, expiresAt: exp * 1000 });
    };

    // Logout: clear token and state
    const logout = useCallback(() => {
        localStorage.removeItem('jwt');
        setAuth({ token: null, expiresAt: null });
    }, []);

    // Auto-logout when token or expiry change
    useEffect(() => {
        if (!token || !expiresAt) return;
        const now = Date.now();
        const msUntilExpiry = expiresAt - now;
        if (msUntilExpiry <= 0) {
        logout();
        } else {
        const timerId = setTimeout(logout, msUntilExpiry);
        return () => clearTimeout(timerId);
        }
    }, [token, expiresAt, logout]);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}