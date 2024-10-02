import React, { useState, useEffect } from 'react';

const SetList = () => {
  const [sets, setSets] = useState([]);
  const [error, setError] = useState(null);

  // Fetch sets from the API when the component is mounted
  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sets');
        if (!response.ok) {
          throw new Error('Failed to fetch sets');
        }
        const data = await response.json();
        setSets(data);  // Store sets data in state
      } catch (error) {
        setError(error.message);  // Handle any errors
      }
    };

    fetchSets();  // Call the function to fetch sets
  }, []);

  // Show error message if any
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Set List</h1>
      <ul>
        {sets.map(set => (
          <li key={set.set_id}>
            Workout ID: {set.workout_id}, Exercise ID: {set.exercise_id}, Reps: {set.reps}, Weight: {set.weight} kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetList;
