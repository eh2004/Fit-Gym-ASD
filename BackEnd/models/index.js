const sequelize = require('../config/database');
const User = require('./user');
const Customer = require('./Customer');
const Trainer = require('./Trainer'); // Import Trainer model
const Workout = require('./Workout');
const Set = require('./Set');
const Exercise = require('./Exercise');
const PaymentCard = require('./PaymentCard');

const db = {
  User,
  Customer,
  Trainer, // Add Trainer to db
  Workout,
  Set,
  Exercise,
  PaymentCard,
  sequelize
};

// Associations
Customer.hasMany(Workout, { foreignKey: 'customer_id' });
Workout.belongsTo(Customer, { foreignKey: 'customer_id' });
Workout.hasMany(Set, { foreignKey: 'workout_id' });
Set.belongsTo(Workout, { foreignKey: 'workout_id' });
Set.belongsTo(Exercise, { foreignKey: 'exercise_id' });
Exercise.hasMany(Set, { foreignKey: 'exercise_id' });

Customer.hasMany(PaymentCard, { foreignKey: 'customer_id' });
PaymentCard.belongsTo(Customer, { foreignKey: 'customer_id' });

// Define Trainer associations here if needed (e.g., Trainer can have workouts or classes)

module.exports = db;