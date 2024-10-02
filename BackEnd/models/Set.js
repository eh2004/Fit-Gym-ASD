const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Workout = require('./Workout');  // Assuming you have a Workout model
const Exercise = require('./Exercise');

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
}, {
  timestamps: false,  // Disable createdAt and updatedAt
  tableName: 'Sets',   // Ensure it uses the correct table name
});

//Set.belongsTo(Workout, { foreignKey: 'workout_id' });

module.exports = Set;
