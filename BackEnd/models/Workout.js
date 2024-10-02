// models/Workout.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance

const Workout = sequelize.define('Workout', {
  workout_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Customers', key: 'customer_id' } // Reference to the Customers table
  },
  workout_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false  // Disable createdAt and updatedAt timestamps
});

module.exports = Workout;
