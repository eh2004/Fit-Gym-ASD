const express = require('express');
const router = express.Router();
const { Measurement } = require('../models/');  // Import the model

// Fetch all measurements (optional)
router.get('/measurements', async (req, res) => {
  try {
    const measurements = await Measurement.findAll();
    res.json(measurements);
  } catch (error) {
    console.error('Error fetching measurements:', error);
    res.status(500).json({ error: 'Error retrieving measurements' });
  }
});

// Fetch measurements by customer ID
router.get('/measurements/customer/:customer_id', async (req, res) => {
  try {
    const { customer_id } = req.params;
    const measurements = await Measurement.findAll({ where: { customer_id } });
    res.json(measurements);
  } catch (error) {
    console.error('Error fetching measurements:', error);
    res.status(500).json({ error: 'Error retrieving measurements for customer' });
  }
});

// Add a new measurement
router.post('/measurements', async (req, res) => {
  try {
    const measurementData = req.body;  // The frontend will send the necessary data
    const newMeasurement = await Measurement.create(measurementData);
    res.status(201).json(newMeasurement);
  } catch (error) {
    console.error('Error adding measurement:', error);
    res.status(500).json({ error: 'Failed to add measurement' });
  }
});

module.exports = router;