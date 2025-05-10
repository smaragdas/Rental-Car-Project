<<<<<<< HEAD
// src/pages/ThankYou.jsx
export default function ThankYou() {
    return (
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-green-700">Thank You!</h2>
        <p className="mt-4 text-lg">Your booking has been confirmed.</p>
      </div>
    );
  }
  
=======
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ThankYouPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    switch (status) {
      case 'paid':
        setMessage('Thank you! Your booking was successful.');
        setColor('text-green-600');
        break;
      case 'cancelled':
        setMessage('Your booking was cancelled. You can try again.');
        setColor('text-yellow-600');
        break;
      case 'failed':
        setMessage('Payment failed. Please try again or contact support.');
        setColor('text-red-600');
        break;
      default:
        setMessage('Thank you for your visit.');
        setColor('text-gray-600');
    }
  }, [status]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className={`text-3xl font-bold mb-4 ${color}`}>{message}</h1>
        <p className="text-gray-700 mb-6">
          We’ve sent you an email with your booking details. For any inquiries, feel free to contact us.
        </p>
        <div className="space-x-4">
          <Link to="/" className="inline-block bg-[#1D3A6C] text-white px-5 py-2 rounded-xl hover:bg-[#163059] transition">
            Back to Home
          </Link>
          <Link to="/booking" className="inline-block border border-[#1D3A6C] text-[#1D3A6C] px-5 py-2 rounded-xl hover:bg-[#1D3A6C] hover:text-white transition">
            Book Again
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
