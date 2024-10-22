const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certificate = sequelize.define('Certificate', {
  certificate_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  certificate_name: {
    type: DataTypes.STRING,
  },
  certificate_provider: {
    type: DataTypes.STRING,
  },
  certificate_duration: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Certificates',
  timestamps: false,
});

module.exports = Certificate;
