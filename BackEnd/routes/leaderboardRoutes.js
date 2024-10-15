const express = require('express');
const router = express.Router();
const { Set, Exercise, Customer, Workout, Sequelize } = require('../models');
const { Op } = require('sequelize');

router.get('/leaderboard', async (req, res) => {
  try {
    // Step 1: Find the maximum weight per exercise
    const maxWeights = await Set.findAll({
      attributes: [
        'exercise_id',
        [Sequelize.fn('MAX', Sequelize.col('weight')), 'best_lift']
      ],
      group: ['exercise_id']
    });

    // Extract the max weight per exercise
    const maxWeightsMap = maxWeights.map(weight => ({
      exercise_id: weight.exercise_id,
      best_lift: weight.dataValues.best_lift
    }));

    // Step 2: Fetch the details (reps, workout, customer) corresponding to the max weights
    const leaderboardData = await Set.findAll({
      where: {
        [Op.or]: maxWeightsMap.map(({ exercise_id, best_lift }) => ({
          exercise_id: exercise_id,
          weight: best_lift
        }))
      },
      include: [
        {
          model: Exercise,
          attributes: ['exercise_id', 'exercise_name']
        },
        {
          model: Workout,
          attributes: ['workout_id', 'customer_id'],
          include: {
            model: Customer,
            attributes: ['customer_id', 'first_name', 'last_name']
          }
        }
      ],
      order: [[Sequelize.col('weight'), 'DESC']]
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
