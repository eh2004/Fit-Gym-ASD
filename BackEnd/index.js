const express = require('express');
const sequelize = require('./config/database'); // Your Sequelize instance
const userRoutes = require('./routes/userRoutes'); // Import user routes
const customerRoutes = require('./routes/customerRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const setRoutes = require('./routes/setRoutes');
const exerciseRoutes = require('./routes/exercisesRoutes');
const trainerRoutes = require('./routes/trainerRoutes'); // Import trainer routes
const leaderboardRoutes = require('./routes/leaderboardRoutes');// Correct path to your routes file
const transactionRoutes = require('./routes/transactionRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const certificateRoutes = require('./routes/certificateRoutes'); // Import certificate routes

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Authenticate and Sync the Database
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
    // Sync the database (this will create the tables if they don't exist)
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Register the routes
app.use('/api', userRoutes); // All user routes will be prefixed with /api
app.use('/api', customerRoutes);
app.use('/api', workoutRoutes);
app.use('/api', exerciseRoutes);
app.use('/api', setRoutes);
app.use('/api', trainerRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', transactionRoutes);
app.use('/api', bookingRoutes);
app.use('/api', certificateRoutes); // Register certificate routes

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});