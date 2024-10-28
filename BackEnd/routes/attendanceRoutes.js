const express = require('express');
const router = express.Router();
const { Workout } = require('../models');

// Helper function to get week number for a given date
const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
};

// Function to calculate daily streak
const calculateDailyStreak = (workouts) => {
    let dailyStreak = 0;
    let maxDailyStreak = 0;
    let previousDate = null;

    for (const workout of workouts) {
        const currentDate = new Date(workout.workout_date);

        if (previousDate && (currentDate - previousDate === 86400000)) {
            dailyStreak += 1;
        } else {
            dailyStreak = 1; // Reset streak if not consecutive
        }

        maxDailyStreak = Math.max(maxDailyStreak, dailyStreak);
        previousDate = currentDate;
    }
    
    return maxDailyStreak;
};

// Function to calculate weekly streak
const calculateWeeklyStreak = (workouts) => {
    let uniqueWeeks = new Set();
    let maxWeeklyStreak = 0;
    let currentWeeklyStreak = 0;
    let previousWeekNumber = null;

    workouts.forEach(workout => {
        const workoutDate = new Date(workout.workout_date);
        const currentWeekNumber = getWeekNumber(workoutDate);

        if (!uniqueWeeks.has(currentWeekNumber)) {
            uniqueWeeks.add(currentWeekNumber);

            if (previousWeekNumber !== null && currentWeekNumber === previousWeekNumber + 1) {
                currentWeeklyStreak += 1; // Consecutive week, increment streak
            } else {
                currentWeeklyStreak = 1; // Reset streak if weeks are not consecutive
            }

            maxWeeklyStreak = Math.max(maxWeeklyStreak, currentWeeklyStreak);
            previousWeekNumber = currentWeekNumber;
        }
    });

    return maxWeeklyStreak;
};

router.get('/attendance/streaks/:customerId', async (req, res) => {
    try {
        const customerId = parseInt(req.params.customerId, 10);

        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        const workouts = await Workout.findAll({
            where: { customer_id: customerId },
            order: [['workout_date', 'ASC']]
        });

        const dailyStreak = calculateDailyStreak(workouts);
        const weeklyStreak = calculateWeeklyStreak(workouts);

        res.json({ dailyStreak, weeklyStreak });
    } catch (error) {
        console.error('Error calculating streaks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
