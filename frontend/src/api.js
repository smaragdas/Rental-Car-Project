import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Replace with your backend base URL

export const checkAvailability = (data) =>
  axios.post(`${BASE_URL}/availability`, data);

export const createBooking = (data) =>
  axios.post(`${BASE_URL}/booking`, data);

export const getAllBookings = () =>
  axios.get(`${BASE_URL}/bookings`);
