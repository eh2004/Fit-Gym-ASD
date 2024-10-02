const express = require('express');
const router = express.Router();
const { Customer, Workout, Set, Exercise } = require('../models'); // Assuming the model is Customer

// Fetch all customers with associated workouts and sets
router.get('/customers', async (req, res) => {
    try {
      const customers = await Customer.findAll({
        include: [
          {
            model: Workout,
            include: [
              {
                model: Set,
                include:[Exercise]
              }
            ]
          }
        ]
      });
      res.json(customers);  // Send the data to the frontend
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Error retrieving customers' });
    }
  });

module.exports = router;
