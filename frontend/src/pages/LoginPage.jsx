// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import publicAxios from '../lib/publicAxios';  // ← now defined

export default function LoginPage() {
    const { login } = useAuth();
    const navigate    = useNavigate();

    const [mode,     setMode]     = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,    setEmail]    = useState('');
    const [resetCode,setResetCode]= useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message,  setMessage]  = useState('');
    const [error,    setError]    = useState('');

    const handleLogin = async e => {
        e.preventDefault();
        setError('');
        try {
        await login(username, password);
        navigate('/admin');
        } catch (err) {
        setError('Login failed: ' + (err.response?.data || err.message));
        }
    };

    const requestResetCode = async e => {
        e.preventDefault();
        setError(''); setMessage('');
        try {
        await publicAxios.post('/auth/forgot-password', { email });
        setMessage('Check your inbox for a reset code.');
        setMode('reset');
        } catch (err) {
        setError(err.response?.data || err.message);
        }
    };

    const performReset = async e => {
        e.preventDefault();
        setError(''); setMessage('');
        try {
        await publicAxios.post('/auth/reset-password', {
            email,
            code: resetCode,
            newPassword,
        });
        setMessage('Password reset! Please log in.');
        setMode('login');
        } catch (err) {
        setError(err.response?.data || err.message);
        }
    };

    const cardClasses = 'bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-black';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {mode === 'login' && (
            <form onSubmit={handleLogin} className={cardClasses}>
            <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
                type="text" value={username} onChange={e=>setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-3 py-2 border rounded mb-3"
                required
            />
            <input
                type="password" value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded mb-3"
                required
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded mb-2 hover:bg-blue-700 transition"
            >
                Log In
            </button>
            <p className="text-center text-sm">
                <button
                type="button"
                onClick={() => { setMode('forgot'); setError(''); setMessage(''); }}
                className="text-blue-600 underline"
                >
                Forgot Password?
                </button>
            </p>
            </form>
        )}

        {mode === 'forgot' && (
            <form onSubmit={requestResetCode} className={cardClasses}>
            <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>
            {error   && <p className="text-red-500 mb-2">{error}</p>}
            {message && <p className="text-green-500 mb-2">{message}</p>}
            <input
                type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="Your admin email"
                className="w-full px-3 py-2 border rounded mb-3"
                required
            />
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition"
            >
                Send Reset Code
            </button>
            <p className="text-center text-sm">
                <button type="button" onClick={()=>setMode('login')} className="text-gray-600 underline">
                Back to Login
                </button>
            </p>
            </form>
        )}

        {mode === 'reset' && (
            <form onSubmit={performReset} className={cardClasses}>
            <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
            {error   && <p className="text-red-500 mb-2">{error}</p>}
            {message && <p className="text-green-500 mb-2">{message}</p>}
            <input
                type="text" value={resetCode} onChange={e=>setResetCode(e.target.value)}
                placeholder="Reset Code"
                className="w-full px-3 py-2 border rounded mb-3"
                required
            />
            <input
                type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-3 py-2 border rounded mb-3"
                required
            />
            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded mb-2 hover:bg-purple-700 transition"
            >
                Set New Password
            </button>
            <p className="text-center text-sm">
                <button type="button" onClick={()=>setMode('login')} className="text-gray-600 underline">
                Back to Login
                </button>
            </p>
            </form>
        )}
        </div>
    );
}