// models/Booking.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance

const Customer = require('./Customer');  // Adjust the path based on your folder structure
const Trainer = require('./Trainer'); // Assuming this is another model you want to associate with


const Booking = sequelize.define('Booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
        model: 'Customers',
        key: 'customer_id' 
    } // Reference to the Customers table
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  booking_type: {
    type: DataTypes.STRING,  // Change as needed (STRING, CHAR, etc.)
    allowNull: true  // Allow null values
  },
  trainer_name: {
    type: DataTypes.STRING,
    allowNull: true,  // Allow null values
  }
}, {
  timestamps: false  // Disable createdAt and updatedAt timestamps
});


module.exports = Booking;
