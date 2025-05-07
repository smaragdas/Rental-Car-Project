import React, { useEffect, useState } from 'react';
import axios from 'axios'; // for public requests
import authAxios from '../lib/authAxios'; // for authenticated requests
import { useAuth } from '../context/AuthContext';
import { parseISO, isBefore, isAfter, isEqual } from 'date-fns';

export default function Admin() {
  const { token } = useAuth();
  const [dailyRate, setDailyRate] = useState(50);
  const [minDays, setMinDays] = useState(4);
  const [fleetSize, setFleetSize] = useState(3);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const today = new Date();

  // — fetch all bookings (public) —
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bookings`);
        setBookings(data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // — fetch settings (admin only) —
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await authAxios.get('/settings');
        setDailyRate(data.dailyRate);
        setMinDays(data.minimumRentalDays);
        setFleetSize(data.fleetSize);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    })();
  }, [token]);

  // — save settings —
  const handleSaveSettings = async () => {
    try {
      const { data } = await authAxios.put('/settings', {
        dailyRate,
        minimumRentalDays: minDays,
        fleetSize
      });
      setDailyRate(data.dailyRate);
      setMinDays(data.minimumRentalDays);
      setFleetSize(data.fleetSize);
      alert('Settings updated successfully');
    } catch (err) {
      console.error('Save settings failed:', err);
      alert('Failed to save settings: ' + (err.response?.data || err.message));
    }
  };

  // — cancel booking —
  const cancelBooking = async (id) => {
    if (!token) return alert('Admin login required');
    try {
      await authAxios.put(`/bookings/${id}/cancel`);
      setBookings(bs => bs.map(b => b.id === id ? { ...b, bookingStatus: 'CANCELLED' } : b));
    } catch (err) {
      console.error('Cancel failed:', err);
      alert('Cancel failed: ' + (err.response?.data || err.message));
    }
  };

  // — delete booking —
  const deleteBooking = async (id) => {
    if (!token) return alert('Admin login required');
    try {
      await authAxios.delete(`/bookings/${id}`);
      setBookings(bs => bs.filter(b => b.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + (err.response?.data || err.message));
    }
  };

  const closeModal = () => setSelectedBooking(null);

  // — compute metrics —
  const total = bookings.length;
  const cancelled = bookings.filter(b => b.bookingStatus === 'CANCELLED').length;
  const active = bookings.filter(b => {
    if (b.bookingStatus !== 'CONFIRMED') return false;
    const start = parseISO(b.startDate);
    const end = parseISO(b.endDate);
    return (isBefore(start, today) || isEqual(start, today)) &&
            (isAfter(end, today) || isEqual(end, today));
  }).length;

  return (
    <div className="pt-28 px-6 pb-12 min-h-screen bg-gray-50 text-black font-sans">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold text-white bg-[#1D3A6C] py-4 px-6 rounded-t-lg">
          Admin Dashboard
        </h1>

        {/* Top metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Bookings',     value: total,     icon: '📅' },
            { label: 'Active Bookings',    value: active,    icon: '✔️' },
            { label: 'Cancelled Bookings', value: cancelled, icon: '❌' },
            { label: 'Settings', value: `€${dailyRate} / ${minDays}d / ${fleetSize ?? '–'} cars`, icon: '⚙️' },
          ].map(m => (
            <div key={m.label} className="bg-white border p-4 rounded-lg text-center shadow-sm">
              <div className="text-sm text-gray-600">{m.icon} {m.label}</div>
              <div className="text-2xl font-bold">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Active bookings list */}
        <div className="mt-8 border rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Active Bookings</h2>
          {loading
            ? <p>Loading…</p>
            : active === 0
              ? <p className="text-gray-600">No active bookings right now.</p>
              : (
                <ul className="list-disc pl-5 space-y-1">
                  {bookings.filter(b => b.bookingStatus === 'CONFIRMED').map(b => (
                    <li key={b.id}>
                      <strong>#{b.id}</strong> — {b.fullName} ({b.startDate} → {b.endDate})
                    </li>
                  ))}
                </ul>
              )
          }
        </div>

        {/* Settings form */}
        <div className="mt-10 border rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Daily Rate (€)
              </label>
              <input
                type="number"
                value={dailyRate}
                onChange={e => setDailyRate(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Min. Rental Days
              </label>
              <input
                type="number"
                value={minDays}
                onChange={e => setMinDays(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Fleet Size (Cars Per Day)
              </label>
              <input
                type="number"
                value={fleetSize}
                onChange={e => setFleetSize(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
          <button
            onClick={handleSaveSettings}
            className="bg-[#1D3A6C] text-white px-6 py-2 rounded hover:bg-[#163059] transition"
          >
            Save Settings
          </button>
        </div>

        {/* Full bookings table */}
        <div className="mt-10 border rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          {loading
            ? <p className="text-center text-gray-600">Loading bookings...</p>
            : error
              ? <p className="text-center text-red-500">{error}</p>
              : (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-100 text-left">
                      {['ID','Name','Email','Dates','Status','Action'].map(h => (
                        <th key={h} className="p-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr
                        key={b.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedBooking(b)}
                      >
                        <td className="p-3">#{b.id}</td>
                        <td className="p-3">{b.fullName}</td>
                        <td className="p-3">{b.email}</td>
                        <td className="p-3">{b.startDate} → {b.endDate}</td>
                        <td className="p-3">{b.bookingStatus}</td>
                        <td className="p-3 space-x-2">
                          {b.bookingStatus === 'CONFIRMED' ? (
                            <button
                              onClick={e => { e.stopPropagation(); cancelBooking(b.id); }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              onClick={e => { e.stopPropagation(); deleteBooking(b.id); }}
                              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-600"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
          }
        </div>

        {/* Details modal */}
        {selectedBooking && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded-lg max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <p><strong>ID:</strong> {selectedBooking.id}</p>
              <p><strong>Name:</strong> {selectedBooking.fullName}</p>
              <p><strong>Email:</strong> {selectedBooking.email}</p>
              <p><strong>Phone:</strong> {selectedBooking.phone}</p>
              <p><strong>Dates:</strong> {selectedBooking.startDate} → {selectedBooking.endDate}</p>
              <p><strong>Status:</strong> {selectedBooking.bookingStatus}</p>
              {selectedBooking.paymentAmount != null && (
                <p><strong>Total:</strong> €{selectedBooking.paymentAmount}</p>
              )}
              {selectedBooking.airportPickup && (
                <>
                  <p><strong>Pickup Location:</strong> {selectedBooking.pickupLocation}</p>
                  <p><strong>Pickup Time:</strong> {selectedBooking.pickupTime}</p>
                  <p><strong>Dropoff Time:</strong> {selectedBooking.dropoffTime}</p>
                </>
              )}
              <p><strong>Notes:</strong> {selectedBooking.notes || '–'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}