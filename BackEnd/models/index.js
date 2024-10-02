const sequelize = require('../config/database');
const User = require('./user');
const Customer = require('./Customer');
const Workout = require('./Workout');

const db = {
  User,
  Customer,
  Workout,
  sequelize
};

module.exports = db;