// models/Workout.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance

const Customer = require('./Customer');  // Adjust the path based on your folder structure
const Set = require('./Set'); // Assuming Set is another model you want to associate with


const Workout = sequelize.define('Workout', {
  workout_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
        model: 'Customers',
        key: 'customer_id' 
    } // Reference to the Customers table
  },
  workout_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false  // Disable createdAt and updatedAt timestamps
});

//Workout.belongsTo(Customer, { foreignKey: 'customer_id' });
//Workout.hasMany(Set, { foreignKey: 'workout_id' });

module.exports = Workout;
