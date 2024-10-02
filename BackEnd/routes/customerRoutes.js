const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Fetch all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll(); 
    res.json(customers); 
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Error retrieving customers' });
  }
});

// Fetch customer by ID
router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id); 
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Error retrieving customer' });
  }
});

// Update an existing customer by ID
router.put('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id); 
    if (customer) {
      // Update customer with data from request body
      await customer.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        street_address: req.body.street_address,
        // Add fitnessGoal and progress if applicable in the database
      });

      res.json({ message: 'Customer updated successfully', customer });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Error updating customer' });
  }
});

module.exports = router;