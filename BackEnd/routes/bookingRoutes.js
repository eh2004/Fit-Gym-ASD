const express = require('express');
const router = express.Router();
const { Booking, Trainer } = require('../models'); 
 

router.post('/bookings', async (req, res) => {
//   console.log('POST /api/bookings route hit');
try {
  const { customer_id, booking_date, booking_type, trainer_id } = req.body;

  // Fetch the trainer's name from the Trainer table using the trainer_id
  const trainer = await Trainer.findByPk(trainer_id);

  if (!trainer) {
    return res.status(404).json({ error: 'Trainer not found' });
  }

  // Combine the trainer's first and last name
  const trainer_name = `${trainer.first_name} ${trainer.last_name}`;

  // Create the new booking with the trainer's name and other details
  const newBooking = await Booking.create({
    customer_id,
    booking_date,
    booking_type,
    trainer_name,  // Store the fetched trainer's name
  });

  res.status(201).json(newBooking);
} catch (error) {
  console.error('Error creating booking:', error);
  res.status(500).json({ error: 'Error creating booking' });
}
});

module.exports = router;