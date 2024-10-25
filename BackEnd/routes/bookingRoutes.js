const express = require('express');
const router = express.Router();
const { Booking } = require('../models');  // You don't need Trainer here

// Route for creating a booking
router.post('/bookings', async (req, res) => {
  try {
    const { customer_id, booking_date, booking_type } = req.body;

    // Create the new booking
    const newBooking = await Booking.create({
      customer_id,
      booking_date,
      booking_type,
      trainer_name,  // Always "Trainer Mike" for Pilates
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
});

module.exports = router;
