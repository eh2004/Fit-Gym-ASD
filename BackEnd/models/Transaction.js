const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  transaction_date: {
    type: DataTypes.DATE,
  },
  transaction_description: {
    type: DataTypes.STRING,
  },
  transaction_type: {
    type: DataTypes.STRING,
  },
  transaction_amount: {
    type: DataTypes.FLOAT,
  },
}, {
  tableName: 'Transactions',
  timestamps: false,
});

module.exports = Transaction;