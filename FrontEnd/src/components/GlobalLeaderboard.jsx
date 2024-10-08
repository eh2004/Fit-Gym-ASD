import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(filterHighestLifts(data))) // Apply the filter
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  // Function to filter the highest lift for each exercise and include reps
  const filterHighestLifts = (data) => {
    const highestLifts = {};

    data.forEach(row => {
      const exerciseName = row.Exercise.exercise_name;
      // If exercise not seen before, or the current lift is higher, store the row
      if (!highestLifts[exerciseName] || row.best_lift > highestLifts[exerciseName].best_lift) {
        highestLifts[exerciseName] = row;
      }
    });

    // Return the filtered list of highest lifts
    return Object.values(highestLifts);
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>User</th>
            <th>Best Lift (kg)</th>
            <th>Reps</th> {/* Include the Reps column */}
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((row, index) => (
            <tr key={index}>
              <td>{row.Exercise.exercise_name}</td>
              <td>{`${row.Workout.Customer.first_name} ${row.Workout.Customer.last_name}`}</td>
              <td>{row.best_lift}</td>
              <td>{row.reps}</td> {/* Display the reps */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
