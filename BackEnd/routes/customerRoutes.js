const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Fetch all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll(); // Fetch all customers from the database
    res.json(customers); // Return customers as JSON
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Error retrieving customers' });
  }
});

// Fetch customer by ID
router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id); // Find customer by primary key
    if (customer) {
      res.json(customer); // Return the customer as JSON
    } else {
      res.status(404).json({ error: 'Customer not found' }); // Send a 404 if customer not found
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Error retrieving customer' });
  }
});

module.exports = router;