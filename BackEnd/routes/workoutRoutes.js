// routes/workoutRoutes.js

const express = require('express');
const router = express.Router();
const { Workout } = require('../models'); // Assuming you have a Workout model

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
  


  

module.exports = router;
