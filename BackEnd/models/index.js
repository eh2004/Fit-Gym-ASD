const sequelize = require('../config/database');
const User = require('./user');
const Customer = require('./Customer');

const db = {
  User,
  Customer,
  sequelize
};

module.exports = db;