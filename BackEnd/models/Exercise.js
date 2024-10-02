// models/Exercise.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import your Sequelize instance

const Exercise = sequelize.define('Exercise', {
  exercise_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exercise_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  muscle_group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,  // Disable createdAt/updatedAt if they aren't needed
  tableName: 'Exercises',  // Specify the table name explicitly
});

module.exports = Exercise;
