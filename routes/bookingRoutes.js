import express from 'express';
import { bookSlot } from '../controllers/bookingController.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Booking creation (open to all)
router.post('/', bookSlot);

// Admin-only route to view bookings
router.get('/', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];

  // Check if the secret key matches
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const bookings = await Booking.find().sort({ bookedAt: -1 });
  res.json(bookings);
});

export default router;
