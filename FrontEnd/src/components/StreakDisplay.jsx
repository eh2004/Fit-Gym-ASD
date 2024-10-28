import React, { useState, useEffect } from 'react';

const StreakDisplay = ({ customer }) => {
  const customerId = customer?.id || JSON.parse(localStorage.getItem("loggedInUser"))?.id;

  const [streaks, setStreaks] = useState({ dailyStreak: 0, weeklyStreak: 0 });

  useEffect(() => {
    if (customerId) {
      fetch(`http://localhost:3000/api/attendance/streaks/${customerId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch streaks');
          return res.json();
        })
        .then(data => setStreaks(data))
        .catch(err => console.error('Error fetching streaks:', err));
    }
  }, [customerId]);

  return (
    <div className="streak-display">
      <h2>Attendance Streaks</h2>
      <p>Daily Streak: {streaks.dailyStreak} days</p>
      <p>Weekly Streak: {streaks.weeklyStreak} weeks</p>
    </div>
  );
};

export default StreakDisplay;
