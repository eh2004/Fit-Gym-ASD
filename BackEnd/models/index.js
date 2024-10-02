const sequelize = require('../config/database');
const User = require('./user');
const Customer = require('./Customer');
const Workout = require('./Workout');
const Set = require('./Set');
const Exercise = require('./Exercise');

const db = {
  User,
  Customer,
  Workout,
  Set,
  Exercise,
  sequelize
};

// Associations
Customer.hasMany(Workout, { foreignKey: 'customer_id' });
Workout.belongsTo(Customer, { foreignKey: 'customer_id' });
Workout.hasMany(Set, { foreignKey: 'workout_id' });
Set.belongsTo(Workout, { foreignKey: 'workout_id' });
Set.belongsTo(Exercise, { foreignKey: 'exercise_id' });
Exercise.hasMany(Set, { foreignKey: 'exercise_id' });

module.exports = db;