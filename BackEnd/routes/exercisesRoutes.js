// routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// Fetch all exercises
router.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);  // Send exercises as JSON response
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Error retrieving exercises' });
  }
});

module.exports = router;
