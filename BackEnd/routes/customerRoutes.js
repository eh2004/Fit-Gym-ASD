const express = require('express');
const router = express.Router();
const { Customer } = require('../models'); // Assuming the model is Customer

// Fetch all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll(); // Fetch all customers from the database
    res.json(customers); // Return customers as JSON
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Error retrieving customers' }); // Send error response
  }
});

module.exports = router;
