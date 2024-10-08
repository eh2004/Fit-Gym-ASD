const Sequelize = require('sequelize'); // Import Sequelize
const sequelize = require('../config/database'); // Your Sequelize instance
const User = require('./user');
const Customer = require('./Customer');
const Trainer = require('./Trainer'); 
const Workout = require('./Workout');
const Set = require('./Set');
const Exercise = require('./Exercise');
const PaymentCard = require('./PaymentCard');

// Create a db object that includes models and the Sequelize instance + Sequelize methods
const db = {
  User,
  Customer,
  Trainer, 
  Workout,
  Set,
  Exercise,
  PaymentCard,
  sequelize, // Export the Sequelize instance
  Sequelize  // Export Sequelize methods like fn and col
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

// Export the db object with associations and Sequelize methods
module.exports = db;
