import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');

// Services
export const getAllServices = () => API.get('/services');
export const getServiceById = (id) => API.get(`/services/${id}`);

// Bookings
export const createBooking = (data) => API.post('/bookings', data);
export const getMyBookings = () => API.get('/bookings/my');
export const cancelBooking = (id) => API.put(`/bookings/${id}/cancel`);

// Admin
export const adminGetAllBookings = () => API.get('/admin/bookings');
export const adminUpdateBooking = (id, data) => API.put(`/admin/bookings/${id}`, data);
export const adminGetStats = () => API.get('/admin/stats');
export const adminCreateService = (data) => API.post('/admin/services', data);
export const adminUpdateService = (id, data) => API.put(`/admin/services/${id}`, data);
export const adminDeleteService = (id) => API.delete(`/admin/services/${id}`);
export const adminGetAllServices = () => API.get('/admin/services');

export default API;
