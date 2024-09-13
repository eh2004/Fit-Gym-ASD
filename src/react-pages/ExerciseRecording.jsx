import React, {useState} from 'react';
import ReactDom from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"

const App = () => {
  const [exercise, setExercises] = useState('');
  const [weight, setWeights] = useState('');
  const [reps, setReps] = useState('');
  const [log, setLog] = useState(false);
  const [sets, setSets] = useState([]);
  const [message, setMessage] = useState('');

const addSet = () => {
  if (!exercise || weight <=0 || reps <=0 || !Number.isInteger(Number(reps))) {
    setMessage('Please fill in all text fields correctly.');
    return;
  }

  setSets([...sets, {exercise, weight, reps, log}]);
  setMessage('Set added!');
  setExercises('');
  setWeights('');
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
        {message && <p style={{color:message === 'Set Added!' ? 'green' : 'red'}}>{message}</p>}
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
        <button onClick={addSet} className="add-set-button" disabled={!exercise || weight <=0 || reps <=0}>Add</button>
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
)
};
ReactDom.createRoot(document.getElementById("root")).render(<App />)