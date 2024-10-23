import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom/client';
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
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);

  // Function to get the current date
  const getCurrentDate = () => {
    return new Date().toISOString(); // Automatically handles timezones and DST
  };

  // Define the exerciseMap at the top of your file
  const exerciseMap = {
    Squat: 1,
    Benchpress: 2,
    Deadlift: 3
  };

  // Start a new workout session
  const startNewWorkout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: 1 }) // replace 1 with actual customer_id dynamically
      });
  
      const newWorkout = await response.json();
      setCurrentWorkoutId(newWorkout.workout_id);  // Set the generated workout ID
    } catch (error) {
      console.error("Failed to start new workout", error);
    }
  };

  // Automatically start a workout session when the page loads (optional)
  useEffect(() => {
    startNewWorkout();
  }, []);

  const addSet = async () => {
    if (!exercise || weight <= 0 || reps <= 0 || !Number.isInteger(Number(reps))) {
      setMessages("Please fill in all text fields correctly.");
      return;
    }
  
    const setData = {
      workout_id: currentWorkoutId,  // This should be the workout ID generated when starting the workout
      exercise_id: exerciseMap[exercise],  // Map the exercise to its ID
      reps: Number(reps),
      weight: Number(weight),
      log,
      set_date: getCurrentDate(),
    };
  
    console.log("Sending set data:", setData);
  
    try {
      const response = await fetch("http://localhost:3000/api/sets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setData),
      });
  
      if (response.ok) {
        setMessages("Set added!");
      } else {
        const result = await response.json();
        console.error("Failed to add set. Server returned:", response.status, result);
        setMessages("Failed to add set.");
      }
    } catch (error) {
      console.error("Error adding set:", error);
      setMessages("Error adding set.");
    }
  
    setExercises("");
    setWeights("");
    setReps("");
    setLog(false);
    setTimeout(() => setMessages(""), 3000);
  };

  return (
    <div className="exercise-container">
      <Header />
      <h1>Exercise Recording</h1>
      
      {/* Button to start a new workout */}
      <button onClick={startNewWorkout} className="start-workout-button">Start New Workout</button>

      <div className="content-wrapper">
        <div className="exercise-box">
          {message && <p style={{ color: message === 'Set added!' ? 'green' : 'red' }}>{message}</p>}
          <label>
            Exercise:
            <select value={exercise} onChange={(e) => setExercises(e.target.value)} className="input">
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
          <button onClick={addSet} className="add-set-button" disabled={!exercise || weight <= 0 || reps <= 0}>
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

// Move ReactDom.createRoot outside the App component
ReactDom.createRoot(document.getElementById("root")).render(<App />);