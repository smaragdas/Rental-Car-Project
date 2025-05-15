// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import publicAxios from '../lib/publicAxios';
import decodeJwt from '../lib/decodeJwt';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) return { token: null, expiresAt: null };
        try {
        const { exp } = decodeJwt(jwt);
        return { token: jwt, expiresAt: exp * 1000 };
        } catch {
        return { token: null, expiresAt: null };
        }
    });

    const { token, expiresAt } = auth;

    const login = async (username, password) => {
        const res = await publicAxios.post('/auth/login', { username, password });
        const jwt = res.data.token;
        const { exp } = decodeJwt(jwt);
        localStorage.setItem('jwt', jwt);
        setAuth({ token: jwt, expiresAt: exp * 1000 });
    };

    const logout = useCallback(() => {
        localStorage.removeItem('jwt');
        setAuth({ token: null, expiresAt: null });
    }, []);

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