const express = require('express');
const router = express.Router();
const { Booking, Trainer } = require('../models'); 
 


router.post('/bookings', async (req, res) => {
  try {
    const { customer_id, booking_date, booking_type, trainer_name } = req.body;

    // Bypass trainer_id requirement for classes like Pilates, CrossFit, Boxing, etc.
    if (["Pilates", "CrossFit", "Boxing", "HIIT", "Cardio", "Weight Training",].includes(booking_type)) {
      // Directly create the booking using the trainer_name
      const newBooking = await Booking.create({
        customer_id,
        booking_date,
        booking_type,
        trainer_name  // Use hardcoded trainer name
      });
      return res.status(201).json(newBooking);
    }

    // For other booking types that require a trainer_id
    const { trainer_id } = req.body;
    if (!trainer_id) {
      return res.status(400).json({ error: 'Trainer ID is required for this booking type.' });
    }

    const trainer = await Trainer.findByPk(trainer_id);

    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    const trainer_full_name = `${trainer.first_name} ${trainer.last_name}`;

    const newBooking = await Booking.create({
      customer_id,
      booking_date,
      booking_type,
      trainer_name: trainer_full_name
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
});




router.get('/bookings/customer/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  try {
    console.log('Fetching bookings for customer_id:', customer_id); // Debugging
    const bookings = await Booking.findAll({ where: { customer_id } });

    if (!bookings) {
      return res.status(404).json({ error: 'No bookings found for this customer' });
    }

    console.log('Fetched bookings:', bookings); // Log the fetched data
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error); // Log the actual error
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});



router.delete('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Booking ID to cancel:', id); // Debug log
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.destroy();
    res.status(204).send(); // Success with no content
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Error cancelling booking' });
  }
});



router.put('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Booking ID to reschedule:', id); // Debug log
  const { booking_date } = req.body;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    booking.booking_date = booking_date;
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.error('Error rescheduling booking:', error);
    res.status(500).json({ error: 'Error rescheduling booking' });
  }
});



module.exports = router;