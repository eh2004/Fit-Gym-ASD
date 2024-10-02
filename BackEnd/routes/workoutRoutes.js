// routes/workoutRoutes.js

const express = require('express');
const router = express.Router();
const { Workout } = require('../models'); // Assuming you have a Workout model

// Fetch workouts by user ID
// Route to fetch workouts by user_id
router.get('/workouts/:user_id', async (req, res) => {
    try {
      const { user_id } = req.params;  // Extract user_id from request params
      
      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      const workouts = await Workout.findAll({
        where: { user_id: user_id }
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
  


  

module.exports = router;
