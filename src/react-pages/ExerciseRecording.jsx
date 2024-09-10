import React, { useState } from 'react';
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"


const App = () => {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [log, setLog] = useState(false);
  const [sets, setSets] = useState([]);
  const [message, setMessage] = useState('');

  const addSet = () => {
    if (!exercise || weight <= 0 || reps <= 0 || !Number.isInteger(Number(reps))) {
      setMessage('Please fill in all fields correctly.');
      return;
    }

    setSets([...sets, { exercise, weight, reps, log }]);
    setMessage('Set added!');

    setExercise('');
    setWeight('');
    setReps('');
    setLog(false);

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="exercise-container">
      <Header /> 
      <h1>Exercise Recording</h1>
      <div className="content-wrapper">
        <div className="exercise-box">
          {message && <p style={{ color: message === 'Set added!' ? 'green' : 'red' }}>{message}</p>}

          <label>
            Exercise:
            <select value={exercise} onChange={(e) => setExercise(e.target.value)} className="input">
              <option value="">Select exercise</option>
              <option value="Squats">Squats</option>
              <option value="Bench Press">Bench Press</option>
              <option value="Deadlift">Deadlift</option>
            </select>
          </label>

          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
            Log this set:
            <input
              type="checkbox"
              checked={log}
              onChange={() => setLog(!log)}
              className="checkbox"
            />
          </label>

          <button onClick={addSet} className="add-set-button" disabled={!exercise || weight <= 0 || reps <= 0}>Add</button>
        </div>

        <div className="sets-table">
          <h2>Sets Added</h2>
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight (kg)</th>
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



ReactDOM.createRoot(document.getElementById("root")).render(<App />);