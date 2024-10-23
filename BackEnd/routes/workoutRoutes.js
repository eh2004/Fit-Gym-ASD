// routes/workoutRoutes.js

const express = require('express');
const router = express.Router();
const { Workout } = require('../models');

// Route to fetch workouts by customer_id
router.get('/workouts/:customer_id', async (req, res) => {
    try {
      const { customer_id } = req.params;  // Extract customer_id from request params

      if (!customer_id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }
      
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
      const workouts = await Workout.findAll();  // Fetch all workouts
      res.json(workouts);  // Send workouts as JSON response
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
