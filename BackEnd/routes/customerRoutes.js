const express = require('express');
const router = express.Router();
const { Customer, Workout, Set, Exercise } = require('../models');

// Fetch all customers with associated workouts, sets, and exercises
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: Workout,
          include: [
            {
              model: Set,
              include: [Exercise]
            }
          ]
        }
      ]
    });
    res.json(customers); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Error retrieving customers' });
  }
});

// Fetch a single customer by ID with associated workouts, sets, and exercises
router.get('/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id, {
      include: [
        {
          model: Workout,
          include: [
            {
              model: Set,
              include: [Exercise]
            }
          ]
        }
      ]
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer); // Send the customer data to the frontend
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).json({ error: 'Error retrieving customer' });
  }
});

// Update an existing customer by ID
router.put('/customers/:id', async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email_address,
    phone_number,
    date_of_birth,
    gender,
    street_address,
    city,
    state,
    zip_code,
    country,
    username,
    password
  } = req.body;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update customer details
    await customer.update({
      first_name,
      last_name,
      email_address,
      phone_number,
      date_of_birth,
      gender,
      street_address,
      city,
      state,
      zip_code,
      country,
      username,
      password
    });

    res.json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Error updating customer' });
  }
});

// Create a new customer
router.post('/customers', async (req, res) => {
  const {
    first_name,
    last_name,
    email_address,
    phone_number,
    date_of_birth,
    gender,
    street_address,
    city,
    state,
    zip_code,
    country,
    username,
    password
  } = req.body;

  try {
    const newCustomer = await Customer.create({
      first_name,
      last_name,
      email_address,
      phone_number,
      date_of_birth,
      gender,
      street_address,
      city,
      state,
      zip_code,
      country,
      username,
      password
    });

    res.status(201).json({ message: 'Customer created successfully', newCustomer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Error creating customer' });
  }
});

// Delete an existing customer by ID
router.delete('/customers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Delete the customer
    await customer.destroy();

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Error deleting customer' });
  }
});

module.exports = router;