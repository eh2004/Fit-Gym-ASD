const Sequelize = require('sequelize'); // Import Sequelize
const sequelize = require('../config/database'); // Your Sequelize instance
const User = require('./user');
const Customer = require('./Customer');
const Trainer = require('./Trainer'); 
const Workout = require('./Workout');
const Set = require('./Set');
const Exercise = require('./Exercise');
const PaymentCard = require('./PaymentCard');
const TrainerCard = require('./TrainerCard');
const Certificate = require('./Certificate');
const Transaction = require('./Transaction');
const Booking = require('./Booking');

// Create a db object that includes models and the Sequelize instance + Sequelize methods
const db = {
  User,
  Customer,
  Trainer, 
  Workout,
  Set,
  Exercise,
  PaymentCard,
  TrainerCard,
  Certificate,
  Transaction,
  Booking,
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

Trainer.hasMany(TrainerCard, { foreignKey: 'trainer_id' });
TrainerCard.belongsTo(Trainer, { foreignKey: 'trainer_id' });

Trainer.hasMany(Certificate, { foreignKey: 'trainer_id' });
Certificate.belongsTo(Trainer, { foreignKey: 'trainer_id' });

Transaction.belongsTo(Trainer, { foreignKey: 'trainer_id' });
Transaction.belongsTo(Customer, { foreignKey: 'customer_id' });


// can someone check this makes sense? - Evan
Customer.hasMany(Booking, { foreignKey: 'customer_id' });
Booking.belongsTo(Customer, { foreignKey: 'customer_id' });



// Export the db object with associations and Sequelize methods
module.exports = db;
