import React, { useState, useEffect } from 'react';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);  // State to store workouts
  const [loading, setLoading] = useState(true);  // State for loading
  const [error, setError] = useState(null);  // State for error

  // Fetch workouts on component mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/workouts');
        const data = await response.json();
        setWorkouts(data);  // Set the fetched workouts
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError('Failed to fetch workouts');  // Set error message
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchWorkouts();
  }, []);

  // If still loading, show a loading message
  if (loading) {
    return <p>Loading workouts...</p>;
  }

  // If there's an error, display it
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the workout list
  return (
    <div>
      <h1>Workout List</h1>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map(workout => (
            <li key={workout.workout_id}>
              Workout ID: {workout.workout_id}, Customer ID: {workout.customer_id}, Date: {workout.workout_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default WorkoutList;
