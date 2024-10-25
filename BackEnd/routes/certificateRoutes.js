const express = require('express');
const router = express.Router();
const { Certificate } = require('../models');

// Fetch all certificates or filter by trainer_id if provided
router.get('/certificates', async (req, res) => {
  const { trainer_id } = req.query;  // Get trainer_id from query parameters
  
  try {
    // If trainer_id is provided, filter certificates by trainer_id
    const certificates = await Certificate.findAll({
      where: trainer_id ? { trainer_id: trainer_id } : {}  // Ensure trainer_id filter is applied
    });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Error retrieving certificates' });
  }
});

// Create a new certificate
router.post('/certificates', async (req, res) => {
  const { certificate_name, certificate_provider, certificate_duration, trainer_id } = req.body;

  try {
    const newCertificate = await Certificate.create({
      certificate_name,
      certificate_provider,
      certificate_duration,
      trainer_id
    });

    res.status(201).json({ message: 'Certificate created successfully', newCertificate });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ error: 'Error creating certificate' });
  }
});

// Update a certificate by ID
router.put('/certificates/:id', async (req, res) => {
  const { id } = req.params;
  const { certificate_name, certificate_provider, certificate_duration, trainer_id } = req.body;

  try {
    const certificate = await Certificate.findByPk(id);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    await certificate.update({
      certificate_name,
      certificate_provider,
      certificate_duration,
      trainer_id
    });

    res.json({ message: 'Certificate updated successfully', certificate });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ error: 'Error updating certificate' });
  }
});

// Delete a certificate by ID
router.delete('/certificates/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const certificate = await Certificate.findByPk(id);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    await certificate.destroy();
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ error: 'Error deleting certificate' });
  }
});

module.exports = router;