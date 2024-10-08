const express = require('express');
const router = express.Router();
const { Set, Exercise, Customer, Workout, Sequelize } = require('../models');

router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await Set.findAll({
      attributes: [
        'exercise_id', 
        [Sequelize.fn('MAX', Sequelize.col('weight')), 'best_lift'], // Get max weight
        'reps',  // Include reps in the attributes
        'workout_id'
      ],
      include: [
        {
          model: Exercise,
          attributes: ['exercise_id', 'exercise_name']
        },
        {
          model: Workout,
          attributes: ['workout_id', 'customer_id'],  // Include workout_id and customer_id
          include: {
            model: Customer,
            attributes: ['customer_id', 'first_name', 'last_name']  // Get customer details
          }
        }
      ],
      group: [
        'Set.exercise_id', 
        'Exercise.exercise_id',  // Include exercise_id in GROUP BY
        'Exercise.exercise_name', 
        'Set.workout_id',  // Include workout_id in GROUP BY
        'Workout.workout_id',  // Include workout_id
        'Workout.customer_id', 
        'Workout->Customer.customer_id', // Include this field in GROUP BY
        'Workout->Customer.first_name', 
        'Workout->Customer.last_name',
        'Set.reps' // Add reps to the group
      ],
      order: [[Sequelize.fn('MAX', Sequelize.col('weight')), 'DESC']]
    });

    if (!leaderboardData.length) {
      return res.status(404).json({ message: 'No leaderboard data found' });
    }

    res.json(leaderboardData); // Send leaderboard data to the frontend
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Error retrieving leaderboard data' });
  }
});

module.exports = router;
