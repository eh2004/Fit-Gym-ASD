const express = require('express');
const router = express.Router();
const { Transaction } = require('../models');

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving transactions", error });
    }
});

module.exports = router;