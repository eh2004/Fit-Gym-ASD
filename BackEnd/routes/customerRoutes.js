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

  // Fetch all workouts and sets for a specific customer by customer_id
router.get('/customers/:customerId/workouts', async (req, res) => {
  const { customerId } = req.params; // Get customer ID from the route parameters
  
  try {
    const customerWorkouts = await Workout.findAll({
      where: { customer_id: customerId }, // Filter by customer_id
      include: [
        {
          model: Set,
          include: [Exercise], // Include associated sets and exercises
        },
      ],
    });

    if (!customerWorkouts.length) {
      return res.status(404).json({ message: 'No workouts found for this customer' });
    }

    res.json(customerWorkouts); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching workouts for customer:', error);
    res.status(500).json({ error: 'Error retrieving workouts' });
  }
});


module.exports = router;