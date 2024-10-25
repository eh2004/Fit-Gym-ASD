const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Ensure correct path

const Measurement = sequelize.define('Measurement', {
  measurement_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  neck: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  arms: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  forearms: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  chest: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  waist: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quads: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  calves: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'Measurements'
});

module.exports = Measurement;