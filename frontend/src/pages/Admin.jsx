import { useState } from 'react';

const dummyBookings = [
  { id: 1025, name: 'Alex Johnson', email: 'alex.d@example.com', date: '2024-06-01', status: 'Confirmed' },
  { id: 1024, name: 'Emily Davis', email: 'emily.d@example.com', date: '2024-07-20', status: 'Cancelled' },
  { id: 1023, name: 'John Smith', email: 'john.s@example.com', date: '2024-05-25', status: 'Confirmed' },
  { id: 1022, name: 'Sarah Brown', email: 'sarah.b@example.com', date: '2024-04-10', status: 'Confirmed' },
];

export default function Admin() {
  const [dailyRate, setDailyRate] = useState(50);
  const [minDays, setMinDays] = useState(3);
  const [bookings, setBookings] = useState(dummyBookings);

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;

  return (
    <div className="pt-28 px-6 pb-12 min-h-screen bg-gray-50 text-black py-10 font-sans">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold text-white bg-[#1D3A6C] py-4 px-6 rounded-t-lg">
          Admin Dashboard
        </h1>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border p-4 rounded-lg text-center shadow-sm">
            <div className="text-sm text-gray-600">📅 Total Bookings</div>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </div>
          <div className="bg-white border p-4 rounded-lg text-center shadow-sm">
            <div className="text-sm text-gray-600">✔️ Active Bookings</div>
            <div className="text-2xl font-bold">{confirmed}</div>
          </div>
          <div className="bg-white border p-4 rounded-lg text-center shadow-sm">
            <div className="text-sm text-gray-600">❌ Cancelled Bookings</div>
            <div className="text-2xl font-bold">{cancelled}</div>
          </div>
          <div className="bg-white border p-4 rounded-lg text-center shadow-sm">
            <div className="text-sm text-gray-600">⚙️ Settings</div>
            <div className="text-md">Daily Rate. €{dailyRate}</div>
            <div className="text-md">Min. Days. {minDays}</div>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-10 border rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Daily Rate (€)</label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Minimum Rental Days</label>
              <input
                type="number"
                value={minDays}
                onChange={(e) => setMinDays(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
          <button className="bg-[#1D3A6C] text-white px-6 py-2 rounded hover:bg-[#163059] transition">
            Save Settings
          </button>
        </div>

        {/* Bookings */}
        <div className="mt-10 border rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="p-3">#{b.id}</td>
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">{b.email}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{b.status}</td>
                  <td className="p-3">
                    {b.status === 'Confirmed' ? (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => deleteBooking(b.id)}
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
        </div>
      </div>
    </div>
  );
}
