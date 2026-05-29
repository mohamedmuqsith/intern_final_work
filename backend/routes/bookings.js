import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// POST /api/bookings — Create booking (PUBLIC - no auth required for customers)
router.post('/', async (req, res) => {
  console.log("INCOMING BOOKING PAYLOAD:", req.body);
  const { customerName, phone, vehicleNumber, serviceType, date, time } = req.body;
  try {
    if (!customerName || !phone || !vehicleNumber || !serviceType || !date || !time) {
      console.log("REJECTED BOOKING. Missing fields.", {customerName, phone, vehicleNumber, serviceType, date, time});
      return res.status(400).json({ message: 'All fields are required' });
    }

    const booking = await Booking.create({
      customerName,
      phone,
      vehicleNumber,
      serviceType,
      date,
      time
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings — Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings/:id — Get a single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/bookings/:id/status — Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const { status } = req.body;
    if (!['Pending', 'Approved', 'Completed', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/bookings/:id — Delete a booking
router.delete('/:id', async (req, res) => {
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

export default router;
