import React, { useState, useEffect } from 'react';
import '../css/styling.css'; // Adjust the path according to your project structure

const PersonalBestLeaderboard = () => {
  const [personalBests, setPersonalBests] = useState([]);

  useEffect(() => {
    // Get the logged-in customer ID from localStorage (assuming you store it there)
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (loggedInUser && loggedInUser.id) {
      fetch(`http://localhost:3000/api/personalbests/${loggedInUser.id}`) // Personal bests API for the logged-in user
        .then(res => res.json())
        .then(data => setPersonalBests(data)) // Use the data directly
        .catch(err => console.error('Error fetching personal bests:', err));
    }
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {personalBests.map((row, index) => (
            <tr key={index}>
              <td>{row.exercise_name}</td>
              <td>{row.best_lift}</td>
              <td>{row.reps}</td>
              <td>{new Date(row.workout_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalBestLeaderboard;
