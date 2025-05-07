import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { DayPicker } from 'react-day-picker';
import { parseISO, eachDayOfInterval } from 'date-fns';

import 'react-phone-number-input/style.css';
import 'react-day-picker/dist/style.css';

import publicAxios from '../lib/publicAxios';

export default function Booking() {
  const today = new Date();

  const [settings, setSettings] = useState({
    dailyRate: 0,
    minimumRentalDays: 1,
    fleetSize: 3
  });

  const [disabledDates, setDisabledDates] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    startDate: null,
    endDate: null,
    pickupOption: 'no',
    pickupLocation: '',
    pickupTime: '',
    dropoffTime: '',
    notes: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    publicAxios.get('/settings')
      .then(res => setSettings(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!settings.fleetSize) return;
    publicAxios.get('/bookings')
      .then(res => {
        const counts = {};
        res.data.forEach(b => {
          eachDayOfInterval({
            start: parseISO(b.startDate),
            end: parseISO(b.endDate),
          }).forEach(d => {
            const key = d.toISOString().slice(0, 10);
            counts[key] = (counts[key] || 0) + 1;
          });
        });
        const full = Object.entries(counts)
          .filter(([, c]) => c >= settings.fleetSize)
          .map(([day]) => parseISO(day));
        setDisabledDates(full);
      })
      .catch(console.error);
  }, [settings.fleetSize]);

  const handleChange = (field, value) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleRangeSelect = (range) => {
    const { from, to } = range || {};
    if (from && (!to || +from === +to)) {
      handleChange('startDate', from);
      handleChange('endDate', from);
    } else {
      handleChange('startDate', from || null);
      handleChange('endDate', to || null);
    }
  };

  const rentalDays = form.startDate && form.endDate
    ? Math.floor((form.endDate - form.startDate) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const {
      fullName, email, phone, age,
      startDate, endDate, pickupOption
    } = form;

    if (!fullName || !email || !phone || !age || !startDate || !endDate) {
      return setError('All fields are required.');
    }
    if (!isValidPhoneNumber(phone)) {
      return setError('Invalid phone number.');
    }
    if (age < 24) {
      return setError('Driver must be at least 24 years old.');
    }
    if (rentalDays < settings.minimumRentalDays) {
      return setError(`Minimum rental is ${settings.minimumRentalDays} days.`);
    }
    if (startDate < today) {
      return setError('Start date cannot be in the past.');
    }

    const payload = {
      ...form,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      airportPickup: pickupOption === 'yes'
    };

    try {
      const bookingRes = await publicAxios.post('/bookings', payload);
      const booking = bookingRes.data;

      const stripeSessionRes = await publicAxios.post('/stripe/checkout-session', {
        amount: booking.paymentAmount * 100,
        successUrl: window.location.origin + '/thank-you',
        cancelUrl: window.location.origin + '/booking',
        metadata: { bookingId: booking.id.toString() }
      });

      window.location.href = stripeSessionRes.data.url;
    } catch (err) {
      const msg = err.response?.data || err.message;
      setError(msg);
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-white text-black px-6 py-20 font-sans"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-4xl font-bold text-center mb-8">Booking Form</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <input type="text" placeholder="Full Name" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} className="border rounded p-3 w-full" />
            <input type="email" placeholder="Email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="border rounded p-3 w-full" />
            <PhoneInput defaultCountry="US" placeholder="Phone" value={form.phone} onChange={v => handleChange('phone', v)} className="border rounded p-3 w-full" />
            <input type="number" placeholder="Age" value={form.age} onChange={e => handleChange('age', e.target.value)} className="border rounded p-3 w-full" />

            <label className="block">
              <span className="text-sm font-semibold">Pickup?</span>
              <select value={form.pickupOption} onChange={e => handleChange('pickupOption', e.target.value)} className="border rounded p-2 w-full">
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>

            {form.pickupOption === 'yes' && (
              <>
                <select value={form.pickupLocation} onChange={e => handleChange('pickupLocation', e.target.value)} className="border rounded p-3 w-full">
                  <option value="">From Where?</option>
                  <option value="airport">Airport</option>
                  <option value="port">Port</option>
                  <option value="train">Train Station</option>
                </select>
                <input type="time" value={form.pickupTime} onChange={e => handleChange('pickupTime', e.target.value)} className="border rounded p-3 w-full" />
                <input type="time" value={form.dropoffTime} onChange={e => handleChange('dropoffTime', e.target.value)} className="border rounded p-3 w-full" />
              </>
            )}

            <textarea placeholder="Additional Notes" value={form.notes} onChange={e => handleChange('notes', e.target.value)} className="border rounded p-3 w-full" />

            <button type="submit" className="w-full bg-[#1D3A6C] text-white py-3 rounded hover:bg-[#163059] transition">
              {form.startDate && form.endDate
                ? `Pay €${(settings.dailyRate * rentalDays).toFixed(2)}`
                : 'Proceed to Payment'}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">Select Dates</h3>
            <DayPicker
              mode="range"
              selected={{ from: form.startDate, to: form.endDate }}
              onSelect={handleRangeSelect}
              fromDate={today}
              disabled={[{ before: today }, ...disabledDates]}
            />
            {form.startDate && form.endDate && (
              <p className="text-center text-sm text-gray-700 mt-2">
                {rentalDays} day{rentalDays > 1 ? 's' : ''} — Total: €{(settings.dailyRate * rentalDays).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}