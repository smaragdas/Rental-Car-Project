// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import authAxios from '../lib/authAxios';
import { useAuth } from '../context/AuthContext';
import { parseISO, isBefore, isAfter, isEqual } from 'date-fns';

export default function Admin() {
  const { token } = useAuth();
  const [dailyRate, setDailyRate] = useState(50);
  const [minDays, setMinDays] = useState(4);
  const [fleetSize, setFleetSize] = useState(3);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortByDateAsc, setSortByDateAsc] = useState(null);

  const today = new Date();

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await authAxios.get('/bookings');
        setBookings(data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

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

  const cancelBooking = async (id) => {
    if (!token) return alert('Admin login required');
    const confirm = window.confirm("Are you sure you want to cancel this booking?\n\nThe customer will receive a 50% refund.");
    if (!confirm) return;
    try {
      await authAxios.put(`/bookings/${id}/cancel`);
      setBookings(bs => bs.map(b => b.id === id ? { ...b, bookingStatus: 'CANCELLED' } : b));
    } catch (err) {
      console.error('Cancel failed:', err);
      alert('Cancel failed: ' + (err.response?.data || err.message));
    }
  };

  const deleteBooking = async (id) => {
    if (!token) return alert('Admin login required');
    const confirm = window.confirm("Are you sure you want to permanently delete this booking?");
    if (!confirm) return;
    try {
      await authAxios.delete(`/bookings/${id}`);
      setBookings(bs => bs.filter(b => b.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + (err.response?.data || err.message));
    }
  };

  const total = bookings.length;
  const cancelled = bookings.filter(b => b.bookingStatus === 'CANCELLED').length;
  const activeBookings = bookings.filter(b => {
    if (b.bookingStatus !== 'CONFIRMED') return false;
    const start = parseISO(b.startDate);
    const end = parseISO(b.endDate);
    return (isBefore(start, today) || isEqual(start, today)) &&
            (isAfter(end, today) || isEqual(end, today));
  });

  const closeModal = () => setSelectedBooking(null);

  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortByDateAsc === null) return a.id - b.id;
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);
    return sortByDateAsc ? aDate - bDate : bDate - aDate;
  });

  return (
    <div className="pt-28 px-6 pb-12 min-h-screen bg-gray-50 text-black font-sans">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold text-white bg-[#1D3A6C] py-4 px-6 rounded-t-lg">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Bookings', value: total, icon: '📅' },
            { label: 'Active Bookings', value: activeBookings.length, icon: '✔️' },
            { label: 'Cancelled Bookings', value: cancelled, icon: '❌' },
            { label: 'Settings', value: `€${dailyRate} / ${minDays}d / ${fleetSize} cars`, icon: '⚙️' },
          ].map(m => (
            <div key={m.label} className="bg-white border p-4 rounded-lg text-center shadow-sm">
              <div className="text-sm text-gray-600">{m.icon} {m.label}</div>
              <div className="text-2xl font-bold">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 border rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Active Bookings</h2>
          {loading ? <p>Loading…</p> :
            activeBookings.length === 0 ? <p className="text-gray-600">No active bookings.</p> :
              <ul className="list-disc pl-5 space-y-1">
                {activeBookings.map(b => (
                  <li key={b.id} className="cursor-pointer hover:underline" onClick={() => setSelectedBooking(b)}>
                    <strong>#{b.id}</strong> — {b.fullName} ({b.startDate} → {b.endDate})
                  </li>
                ))}
              </ul>}
        </div>

        <div className="mt-10 border rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input type="number" className="border p-2 rounded" value={dailyRate} onChange={e => setDailyRate(+e.target.value)} placeholder="Daily Rate (€)" />
            <input type="number" className="border p-2 rounded" value={minDays} onChange={e => setMinDays(+e.target.value)} placeholder="Min. Days" />
            <input type="number" className="border p-2 rounded" value={fleetSize} onChange={e => setFleetSize(+e.target.value)} placeholder="Fleet Size" />
          </div>
          <button
            onClick={async () => {
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
            }}
            className="bg-[#1D3A6C] text-white px-6 py-2 rounded hover:bg-[#163059] transition"
          >
            Save Settings
          </button>
        </div>

        <div className="mt-10 border rounded-lg p-5 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Bookings</h2>
            <button onClick={() => setSortByDateAsc(prev => prev === null ? true : !prev)} className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
              {sortByDateAsc === null ? "Sorted by ID" : `Sort by Start Date ${sortByDateAsc ? '↑' : '↓'}`}
            </button>
          </div>
          {loading ? <p>Loading…</p> : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-left">
                  {['ID', 'Name', 'Email', 'Dates', 'Status', 'Action'].map(h => (
                    <th key={h} className="p-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedBookings.map(b => (
                  <tr key={b.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedBooking(b)}>
                    <td className="p-3">#{b.id}</td>
                    <td className="p-3">{b.fullName}</td>
                    <td className="p-3">{b.email}</td>
                    <td className="p-3">{b.startDate} → {b.endDate}</td>
                    <td className="p-3">{b.bookingStatus}</td>
                    <td className="p-3 space-x-2">
                      {b.bookingStatus === 'CONFIRMED' ? (
                        <button onClick={e => { e.stopPropagation(); cancelBooking(b.id); }} className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>
                      ) : (
                        <button onClick={e => { e.stopPropagation(); deleteBooking(b.id); }} className="bg-gray-500 text-white px-3 py-1 rounded">Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={closeModal}>
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative" onClick={e => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute top-2 right-2">✕</button>
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <p><strong>ID:</strong> {selectedBooking.id}</p>
              <p><strong>Name:</strong> {selectedBooking.fullName}</p>
              <p><strong>Email:</strong> {selectedBooking.email}</p>
              <p><strong>Phone:</strong> {selectedBooking.phone}</p>
              <p><strong>Dates:</strong> {selectedBooking.startDate} → {selectedBooking.endDate}</p>
              <p><strong>Status:</strong> {selectedBooking.bookingStatus}</p>
              {selectedBooking.paymentAmount && <p><strong>Total:</strong> €{selectedBooking.paymentAmount}</p>}
              {selectedBooking.airportPickup && (
                <>
                  <p><strong>Pickup:</strong> {selectedBooking.pickupLocation}</p>
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
