import express from 'express';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Apply protect & admin middleware to all routes in this file
router.use(protect);
router.use(admin);

// Admin: Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update booking status
router.put('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const { status } = req.body;
    if (status && !['Pending', 'Approved', 'Completed', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be: Pending, Approved, Completed, or Rejected' });
    }

    booking.status = status || booking.status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete booking
router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await Booking.deleteOne({ _id: req.params.id });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({});
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const approvedBookings = await Booking.countDocuments({ status: 'Approved' });
    const completedBookings = await Booking.countDocuments({ status: 'Completed' });
    const rejectedBookings = await Booking.countDocuments({ status: 'Rejected' });

    // Today's bookings
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = await Booking.countDocuments({ date: today });

    res.json({ 
      totalBookings, 
      pendingBookings, 
      approvedBookings, 
      completedBookings, 
      rejectedBookings,
      todayBookings 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all services (full catalog list)
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Create service category
router.post('/services', async (req, res) => {
  const { name, description, price, duration, category } = req.body;
  try {
    const service = await Service.create({ name, description, price, duration, category });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update service category
router.put('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    service.name = req.body.name || service.name;
    service.description = req.body.description || service.description;
    service.price = req.body.price ?? service.price;
    service.duration = req.body.duration || service.duration;
    service.category = req.body.category || service.category;

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete service category
router.delete('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await Service.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all customers (users)
router.get('/customers', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete customer
router.delete('/customers/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
