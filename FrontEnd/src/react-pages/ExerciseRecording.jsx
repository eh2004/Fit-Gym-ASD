import React, { useState } from 'react';
import ReactDom from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/styling.css";

const App = () => {
  const [exercise, setExercises] = useState('');
  const [weight, setWeights] = useState('');
  const [reps, setReps] = useState('');
  const [log, setLog] = useState(false);
  const [sets, setSets] = useState([]);
  const [message, setMessages] = useState('');

  const addSet = () => {
    if (!exercise || weight <= 0 || reps <= 0 || !Number.isInteger(Number(reps))) {
      setMessages('Please fill in all text fields correctly.');
      return;
    }

    // Prepare the set data
    const newSet = { exercise, weight, reps, log };

    // Add set to local state
    setSets([...sets, newSet]);

    // Show success message
    setMessages('Set added!');
    setExercises('');
    setWeights('');
    setReps('');
    setLog(false);

    setTimeout(() => setMessages(''), 3000);

    // Log the set in the database if "Log this Set" is selected
    if (log) {
      logSet(newSet); // Call the API function here
    }
  };

  // Function to log set to backend
  const logSet = (newSet) => {
    fetch('http://localhost:3000/api/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workout_id: 1, // Replace with actual workout ID
        exercise_id: 1, // Assuming you have IDs for exercises in your database
        reps: newSet.reps,
        weight: newSet.weight,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Set logged in database:', data);
        setMessages('Set logged successfully!');
      })
      .catch((error) => {
        console.error('Error logging set:', error);
        setMessages('Failed to log set in the database.');
      });
  };

  return (
    <div className="exercise-container">
      <Header />
      <h1>Exercise Recording</h1>
      <div className="content-wrapper">
        <div className="exercise-box">
          {message && (
            <p style={{ color: message === 'Set added!' ? 'green' : 'red' }}>
              {message}
            </p>
          )}
          <label>
            Exercise:
            <select
              value={exercise}
              onChange={(e) => setExercises(e.target.value)}
              className="input"
            >
              <option value="">Select Exercise</option>
              <option value="Squat">Squat</option>
              <option value="Benchpress">Benchpress</option>
              <option value="Deadlift">Deadlift</option>
            </select>
          </label>
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeights(e.target.value)}
              className="input"
              min="0.01"
              step="0.01"
            />
          </label>
          <label>
            Reps:
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="input"
              min="1"
              step="1"
            />
          </label>
          <label>
            Log this Set:
            <input
              type="checkbox"
              checked={log}
              onChange={() => setLog(!log)}
              className="checkbox"
            />
          </label>
          <button
            onClick={addSet}
            className="add-set-button"
            disabled={!exercise || weight <= 0 || reps <= 0}
          >
            Add
          </button>
        </div>
        <div className="sets-table">
          <h2>Sets Added</h2>
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight</th>
                <th>Reps</th>
                <th>Logged</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index}>
                  <td>{set.exercise}</td>
                  <td>{set.weight}</td>
                  <td>{set.reps}</td>
                  <td>{set.log ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

ReactDom.createRoot(document.getElementById("root")).render(<App />);