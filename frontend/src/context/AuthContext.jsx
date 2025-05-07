// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import publicAxios from '../lib/publicAxios'; // for login

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('jwt'));

    const login = async (username, password) => {
        const res = await publicAxios.post('/auth/login', { username, password });
        const jwt = res.data.token;
        localStorage.setItem('jwt', jwt);
        setToken(jwt);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}