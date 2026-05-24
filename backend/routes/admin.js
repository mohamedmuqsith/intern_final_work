import express from 'express';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
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
    booking.status = req.body.status || booking.status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({});
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    res.json({ totalBookings, pendingBookings, confirmedBookings, completedBookings });
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
    service.price = req.body.price || service.price;
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

export default router;
