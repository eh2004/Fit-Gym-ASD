import React, { useState, useEffect } from 'react';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

  // Fetch exercises on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/exercises');
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchExercises();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Exercise List</h1>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.exercise_id}>
            {exercise.exercise_name} - {exercise.muscle_group} ({exercise.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
