const express = require('express');
const router = express.Router();
const { Booking, Trainer } = require('../models'); 
 


router.post('/bookings', async (req, res) => {
  try {
    const { customer_id, booking_date, booking_type, trainer_name } = req.body;

    console.log('Received data:', { customer_id, booking_date, booking_type, trainer_name });

    // Skip trainer lookup for Pilates
    if (booking_type === "Pilates" && trainer_name === "Trainer Mike") {
      // Directly create the booking without looking for trainer_id
      const newBooking = await Booking.create({
        customer_id,
        booking_date,
        booking_type,
        trainer_name,  // This will be "Trainer Mike"
      });

      return res.status(201).json(newBooking);
    }

    // Normal flow for other booking types
    const trainer = await Trainer.findByPk(trainer_id); // Your logic for other booking types

    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    const trainer_full_name = `${trainer.first_name} ${trainer.last_name}`;

    const newBooking = await Booking.create({
      customer_id,
      booking_date,
      booking_type,
      trainer_name: trainer_full_name,  // Store the fetched trainer's name
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
});


module.exports = router;