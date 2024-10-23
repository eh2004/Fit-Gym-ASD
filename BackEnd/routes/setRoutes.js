const express = require('express');
const router = express.Router();
const { Set } = require('../models'); // Assuming you have a Workout model

// Fetch all sets
router.get('/sets', async (req, res) => {
  try {
    const sets = await Set.findAll();  // Fetch all sets
    res.json(sets);  // Send sets as JSON
  } catch (error) {
    console.error('Error fetching sets:', error);
    res.status(500).json({ error: 'Error retrieving sets' });
  }
});

// Fetch sets by workout ID
router.get('/sets/workout/:workoutId', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const sets = await Set.findAll({ where: { workout_id: workoutId } });
    res.json(sets);
  } catch (error) {
    console.error('Error fetching sets by workout:', error);
    res.status(500).json({ error: 'Error retrieving sets for workout' });
  }
});

// Route to add a new set
router.post("/sets", async (req, res) => {
  try {
    console.log("Received set data:", req.body);

    const { workout_id, exercise_id, reps, weight, log, set_date } = req.body;

    const newSet = await Set.create({
      workout_id,
      exercise_id,
      reps,
      weight,
      log,
      set_date: set_date || new Date(),
    });

    res.status(201).json(newSet);
  } catch (error) {
    console.error('Error adding set:', error);
    res.status(500).json({ message: "Failed to add set", error: error.message });
  }
});

module.exports = router;