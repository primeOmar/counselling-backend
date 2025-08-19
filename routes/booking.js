const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings
router.post('/bookings', async (req, res) => {
  try {
    const { counsellorId, date, timeSlot } = req.body;

    // Check if slot is already booked
    const alreadyBooked = await Booking.findOne({ counsellorId, date, timeSlot });
    if (alreadyBooked) {
      return res.status(409).json({ error: 'Slot already booked' });
    }

    const booking = new Booking(req.body);
    await booking.save();

    res.json({ success: true, message: 'Booking confirmed' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
