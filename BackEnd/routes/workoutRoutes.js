const express = require('express');
const router = express.Router();
const { Workout } = require('../models'); // Assuming you have a Workout model

// Route to create a new workout
router.post('/workouts', async (req, res) => {
  try {
      const { customer_id } = req.body;
      const newWorkout = await Workout.create({
          customer_id: customer_id,   // Set the customer ID
          workout_date: new Date(),   // Auto-generate the workout date
      });
      res.status(201).json(newWorkout);  // Return the new workout's details (ID) to the frontend
  } catch (error) {
      console.error('Error creating new workout:', error);
      res.status(500).json({ error: 'Error creating new workout' });
  }
});

// Route to fetch workouts by customer_id
router.get('/workouts/:customer_id', async (req, res) => {
    try {
      const { customer_id } = req.params;

      // Ensure that customer_id is provided
      if (!customer_id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }
      
      // Find all workouts by customer_id
      const workouts = await Workout.findAll({
        where: { customer_id: customer_id }
      });

      res.json(workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).json({ error: 'Error retrieving workouts' });
    }
});

// Route to fetch all workouts
router.get('/workouts', async (req, res) => {
    try {
      // Find all workouts
      const workouts = await Workout.findAll();
      res.json(workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).json({ error: 'Error retrieving workouts' });
    }
  });
  



  //Evans work:

// Route to book a new workout (POST request)

router.post('/workouts', async (req, res) => {
  console.log('POST /api/workouts route hit');
  try {
    const { customer_id, workout_date } = req.body;
    const newWorkout = await Workout.create({ customer_id, workout_date });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Error booking workout' });
  }
});

module.exports = router;