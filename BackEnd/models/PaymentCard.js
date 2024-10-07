const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentCard = sequelize.define('PaymentCard', {
  credit_card_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_on_card: {
    type: DataTypes.STRING,
  },
  card_number: {
    type: DataTypes.STRING,
  },
  cvv: {
    type: DataTypes.STRING,
  },
  expiration_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Payment_Cards',
  timestamps: false,
});

module.exports = PaymentCard;