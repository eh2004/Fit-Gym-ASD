import React, { useState, useEffect } from 'react';
import '../css/styling.css';

const PersonalBestLeaderboard = ({ customer }) => {
  const customerId = customer?.id || JSON.parse(localStorage.getItem("loggedInUser"))?.id;
  const [personalBests, setPersonalBests] = useState([]);

  useEffect(() => {
    if (customerId) {
      fetch(`http://localhost:3000/api/personalbests/${customerId}`)
        .then(res => res.json())
        .then(data => setPersonalBests(data))
        .catch(err => console.error('Error fetching personal bests:', err));
    }
  }, [customerId]);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Your Personal Bests</h1>
      <table className="leaderboard">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Best Lift (kg)</th>
            <th>Reps</th>
            <th>Date</th>
            <th>Calories Burned</th> {/* New column for calories */}
          </tr>
        </thead>
        <tbody>
          {personalBests.map((row, index) => (
            <tr key={index}>
              <td>{row.exercise_name}</td>
              <td>{row.best_lift}</td>
              <td>{row.reps}</td>
              <td>{new Date(row.workout_date).toLocaleDateString()}</td>
              <td>{row.caloriesBurned}</td> {/* Display calories burned */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalBestLeaderboard;
