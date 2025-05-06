import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Booking() {
  const [pickupOption, setPickupOption] = useState('no');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    startDate: '',
    endDate: '',
    pickupTime: '',
    dropoffTime: '',
    pickupLocation: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.section
      className="min-h-screen bg-white text-black px-6 py-20 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold text-center mb-8">Booking Form</h2>
        <form className="grid grid-cols-1 gap-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full"
              required
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full"
              required
            />
          </div>

          {/* Pickup Option */}
          <div>
            <label className="block text-sm font-semibold mb-1">Pickup</label>
            <select
              value={pickupOption}
              onChange={(e) => setPickupOption(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {pickupOption === 'yes' && (
            <>
              <select
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full"
                required
              >
                <option value="">From Where?</option>
                <option value="airport">Airport</option>
                <option value="port">Port</option>
                <option value="train">Train Station</option>
              </select>

              <input
                type="time"
                name="pickupTime"
                placeholder="Pickup Time"
                value={form.pickupTime}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full"
                required
              />
              <input
                type="time"
                name="dropoffTime"
                placeholder="Drop-off Time"
                value={form.dropoffTime}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full"
                required
              />
            </>
          )}

          <textarea
            name="notes"
            rows="4"
            placeholder="Additional Notes"
            value={form.notes}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </motion.section>
  );
}
