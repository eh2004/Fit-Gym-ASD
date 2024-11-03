require('dotenv').config();
const { Sequelize } = require('sequelize');


//console.log('DATABASE_URL:', process.env.DATABASE_URL); // Add this line

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: {
        rejectUnauthorized: false // Use if SSL is required, adjust based on your needs
    }
});

module.exports = sequelize;