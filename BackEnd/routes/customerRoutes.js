const express = require('express');
const router = express.Router();
const { Customer, Workout, Set, Exercise } = require('../models');

// Route to get personal best lifts for a customer
router.get('/personalbests/:customerId', async (req, res) => {
  const { customerId } = req.params;
  
  try {
    // Fetch all workouts for the customer including related sets and exercises
    const workouts = await Workout.findAll({
      where: { customer_id: customerId },
      include: [
        {
          model: Set,
          include: [
            { model: Exercise, attributes: ['exercise_name'] } // Include exercise details
          ]
        }
      ]
    });

    // Filter to get the highest lift for each exercise and calculate calories
    const personalBests = {};
    
    workouts.forEach(workout => {
      workout.Sets.forEach(set => {
        const exerciseName = set.Exercise.exercise_name;
        const caloriesBurned = set.reps * set.weight * 0.1; // Simple calorie formula

        if (!personalBests[exerciseName] || set.weight > personalBests[exerciseName].best_lift) {
          personalBests[exerciseName] = {
            exercise_name: exerciseName,
            best_lift: set.weight,
            reps: set.reps,
            workout_date: workout.workout_date,
            caloriesBurned: caloriesBurned.toFixed(2), // Format calories to 2 decimal places
          };
        }
      });
    });

    // Send the response as an array of personal bests with calories
    res.json(Object.values(personalBests));
  } catch (error) {
    console.error('Error fetching personal bests:', error);
    res.status(500).json({ error: 'Error fetching personal bests' });
  }
});

module.exports = router;
