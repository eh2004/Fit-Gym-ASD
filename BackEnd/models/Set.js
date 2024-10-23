const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Set = sequelize.define('Set', {
  set_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  workout_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Workouts', // Reference to Workout model
      key: 'workout_id', // Key in the Workout model
    },
    onDelete: 'CASCADE',  // If a workout is deleted, delete the associated sets
    onUpdate: 'CASCADE',  // Update the workout_id if it's updated in the Workout table
  },
  exercise_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Exercises', // Reference to Exercise model
      key: 'exercise_id', // Key in the Exercise model
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // New column for storing the date of the set
  set_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Automatically sets the current date
  },
}, {
  timestamps: false,  // Disable createdAt and updatedAt
  tableName: 'Sets',   // Ensure it uses the correct table name
});

module.exports = Set;