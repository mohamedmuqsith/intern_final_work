import express from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create booking
router.post('/', protect, async (req, res) => {
  const { serviceId, vehicleType, vehicleMake, vehicleModel, vehicleYear, licensePlate, date, time, notes } = req.body;
  try {
    let finalServiceId = serviceId;
    let serviceName = 'Unknown Service';

    if (mongoose.Types.ObjectId.isValid(serviceId)) {
      const service = await Service.findById(serviceId);
      if (service) {
        serviceName = service.name;
      }
    } else {
      // Graceful fallback for mock service IDs '1' to '6'
      const mockNameMap = {
        '1': 'Oil Change',
        '2': 'Engine Tune-Up',
        '3': 'Brake Service',
        '4': 'Full Inspection',
        '5': 'Battery Replacement',
        '6': 'AC Service'
      };
      const mappedName = mockNameMap[serviceId];
      if (mappedName) {
        const service = await Service.findOne({ name: mappedName });
        if (service) {
          finalServiceId = service._id;
          serviceName = service.name;
        } else {
          return res.status(400).json({ message: 'Service category not initialized in database' });
        }
      } else {
        return res.status(400).json({ message: 'Invalid Service ID format' });
      }
    }

    const booking = await Booking.create({
      user: req.user._id,
      service: finalServiceId,
      serviceName,
      vehicleType,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      licensePlate,
      date,
      time,
      notes
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get my bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel my booking
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
