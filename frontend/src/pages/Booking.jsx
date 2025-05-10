// src/pages/Booking.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { DayPicker } from 'react-day-picker';
import { parseISO, eachDayOfInterval } from 'date-fns';
import 'react-phone-number-input/style.css';
import 'react-day-picker/dist/style.css';
import publicAxios from '../lib/publicAxios';
import TermsAndConditions from './TermsAndConditions';

export default function Booking() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [settings, setSettings] = useState({ dailyRate: 50, minimumRentalDays: 3, fleetSize: 3 });
  const [disabledDates, setDisabledDates] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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
        res.data
          .filter(b => ['CONFIRMED', 'PAID'].includes(b.bookingStatus))
          .forEach(b => {
            eachDayOfInterval({ start: parseISO(b.startDate), end: parseISO(b.endDate) })
              .forEach(d => {
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
    setError('');
    const { from, to } = range || {};
    if (!from) return;
    if (!to || +from === +to) {
      if (disabledDates.some(d => +d === +from)) {
        setError('No cars available on that day.');
        return;
      }
      handleChange('startDate', from);
      handleChange('endDate', from);
      return;
    }
    const interval = eachDayOfInterval({ start: from, end: to });
    for (let d of interval) {
      if (disabledDates.some(dd => +dd === +d)) {
        setError('Your range includes fully booked dates.');
        return;
      }
    }
    handleChange('startDate', from);
    handleChange('endDate', to);
  };

  const rentalDays = form.startDate && form.endDate
    ? Math.floor((form.endDate - form.startDate) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!acceptedTerms) {
      setError('You must accept the Terms & Conditions to proceed.');
      return;
    }
    setLoading(true);

    if (!settings.minimumRentalDays) {
      setError('Settings not loaded yet. Please wait...');
      setLoading(false);
      return;
    }

    const { fullName, email, phone, age, startDate, endDate, pickupOption } = form;
    if (!fullName || !email || !phone || !age || !startDate || !endDate) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setError('Invalid phone number.');
      setLoading(false);
      return;
    }
    if (age < 24) {
      setError('Driver must be at least 24 years old.');
      setLoading(false);
      return;
    }
    if (rentalDays < settings.minimumRentalDays) {
      setError(`Minimum rental is ${settings.minimumRentalDays} days.`);
      setLoading(false);
      return;
    }

    const selectedStart = new Date(startDate);
    selectedStart.setHours(0, 0, 0, 0);
    if (selectedStart < today) {
      setError('Start date cannot be in the past.');
      setLoading(false);
      return;
    }

    for (let day of rentalDays > 1 ? eachDayOfInterval({ start: form.startDate, end: form.endDate }) : [form.startDate]) {
      if (disabledDates.some(dis => +dis === +day)) {
        setError('One or more selected dates are no longer available.');
        setLoading(false);
        return;
      }
    }

    try {
      const bookingRes = await publicAxios.post('/bookings', {
        ...form,
        startDate: form.startDate.toISOString().slice(0, 10),
        endDate: form.endDate.toISOString().slice(0, 10),
        airportPickup: pickupOption === 'yes'
      });
      const booking = bookingRes.data;
      if (booking.bookingStatus === 'PAID') {
        setError('This booking is already paid.');
        setLoading(false);
        return;
      }
      const stripeSession = await publicAxios.post('/stripe/checkout-session', {
        amount: booking.paymentAmount * 100,
        successUrl: `${window.location.origin}/thank-you?status=paid`,
        cancelUrl: `${window.location.origin}/booking?status=cancelled`,
        metadata: { bookingId: booking.id.toString() }
      });
      window.location.href = stripeSession.data.url;
    } catch (err) {
      setError(err.response?.data || err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}  
      <motion.section
        className="min-h-screen bg-white text-black px-6 py-20 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-center mb-8">Booking Form</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name, Email, Phone, Age */}
              <input type="text" placeholder="Full Name" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} className="border rounded p-3 w-full" />
              <input type="email" placeholder="Email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="border rounded p-3 w-full" />
              <PhoneInput defaultCountry="US" placeholder="Phone" value={form.phone} onChange={v => handleChange('phone', v)} className="border rounded p-3 w-full" />
              <input type="number" placeholder="Age" value={form.age} onChange={e => handleChange('age', e.target.value)} className="border rounded p-3 w-full" />

              {/* Pickup Options */}
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

              {/* Notes */}
              <textarea placeholder="Additional Notes" value={form.notes} onChange={e => handleChange('notes', e.target.value)} className="border rounded p-3 w-full" />

              {/* Terms & Conditions Section */}
              <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">
                  Please read and accept our <span className="font-semibold">Terms & Conditions</span> before proceeding.
                </p>
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={e => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-800">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-indigo-600 hover:underline focus:outline-none"
                    >
                      Terms & Conditions
                    </button>
                  </span>
                </label>
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !settings.minimumRentalDays || !acceptedTerms}
                className={`w-full py-3 rounded transition ${
                  loading || !settings.minimumRentalDays || !acceptedTerms
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#1D3A6C] hover:bg-[#163059]'
                } text-white`}
              >
                {!settings.minimumRentalDays
                  ? 'Loading settings…'
                  : loading
                  ? 'Redirecting to Stripe…'
                  : form.startDate && form.endDate
                  ? `Pay €${(settings.dailyRate * rentalDays).toFixed(2)}`
                  : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          {/* Date Picker */}
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
    </>
  );
}
