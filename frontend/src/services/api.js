import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request (for admin routes)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth (Admin only)
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');

// Services (Public)
export const getAllServices = () => API.get('/services');
export const getServiceById = (id) => API.get(`/services/${id}`);

// Bookings (Public - no auth required for customer form)
export const createBooking = (data) => API.post('/bookings', data);
export const getAllBookings = () => API.get('/bookings');
export const getBookingById = (id) => API.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => API.put(`/bookings/${id}/status`, { status });
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);

// Admin (Protected)
export const adminGetAllBookings = () => API.get('/admin/bookings');
export const adminUpdateBooking = (id, data) => API.put(`/admin/bookings/${id}`, data);
export const adminDeleteBooking = (id) => API.delete(`/admin/bookings/${id}`);
export const adminGetStats = () => API.get('/admin/stats');
export const adminCreateService = (data) => API.post('/admin/services', data);
export const adminUpdateService = (id, data) => API.put(`/admin/services/${id}`, data);
export const adminDeleteService = (id) => API.delete(`/admin/services/${id}`);
export const adminGetAllServices = () => API.get('/admin/services');

// Admin: Customers (Users)
export const adminGetAllCustomers = () => API.get('/admin/customers');
export const adminDeleteCustomer = (id) => API.delete(`/admin/customers/${id}`);

export default API;
