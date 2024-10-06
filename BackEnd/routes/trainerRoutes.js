const express = require('express');
const router = express.Router();
const { Trainer } = require('../models');

// Fetch all trainers
router.get('/trainers', async (req, res) => {
  try {
    const trainers = await Trainer.findAll();
    res.json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ error: 'Error retrieving trainers' });
  }
});

// Fetch a single trainer by ID
router.get('/trainers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (error) {
    console.error('Error fetching trainer by ID:', error);
    res.status(500).json({ error: 'Error retrieving trainer' });
  }
});

// Update an existing trainer by ID
router.put('/trainers/:id', async (req, res) => {
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
    password,
    language
  } = req.body;

  try {
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    // Update trainer details
    await trainer.update({
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
      password,
      language
    });

    res.json({ message: 'Trainer updated successfully', trainer });
  } catch (error) {
    console.error('Error updating trainer:', error);
    res.status(500).json({ error: 'Error updating trainer' });
  }
});

// Create a new trainer
router.post('/trainers', async (req, res) => {
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
    password,
    language
  } = req.body;

  try {
    const newTrainer = await Trainer.create({
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
      password,
      language
    });

    res.status(201).json({ message: 'Trainer created successfully', newTrainer });
  } catch (error) {
    console.error('Error creating trainer:', error);
    res.status(500).json({ error: 'Error creating trainer' });
  }
});

// Delete an existing trainer by ID
router.delete('/trainers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    // Delete the trainer
    await trainer.destroy();

    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    res.status(500).json({ error: 'Error deleting trainer' });
  }
});

module.exports = router;