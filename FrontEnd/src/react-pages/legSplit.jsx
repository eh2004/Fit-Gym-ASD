import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

function App() {

   

    return (
        <React.Fragment>
            <Header />
            <div className="arm-split-container">
      <h1 className="arm-split-title">Leg Workout Split</h1>

      <h2 className="arm-split-subtitle">Exercises to Target Leg Muscles</h2>
      <ul className="arm-split-exercise-list">
        <li className="arm-split-exercise-item">Squats - 4 sets of 10 reps (Targets: Quadriceps, Glutes, Hamstrings)</li>
        <li className="arm-split-exercise-item">Lunges - 3 sets of 12 reps (Targets: Quadriceps, Glutes, Hamstrings)</li>
        <li className="arm-split-exercise-item">Leg Press - 3 sets of 15 reps (Targets: Quadriceps, Glutes)</li>
        <li className="arm-split-exercise-item">Calf Raises - 4 sets of 20 reps (Targets: Calves)</li>
        <li className="arm-split-exercise-item">Hamstring Curls - 3 sets of 12 reps (Targets: Hamstrings)</li>
        <li className="arm-split-exercise-item">Leg Extensions - 3 sets of 12 reps (Targets: Quadriceps)</li>
      </ul>

      <h2 className="arm-split-subtitle">Weekly Leg Workout Split</h2>
      <table className="arm-split-table">
        <thead>
          <tr>
            <th className="arm-split-table-header">Day</th>
            <th className="arm-split-table-header">Workout</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="arm-split-day">Monday</td>
            <td className="arm-split-workout">Squats, Lunges, Calf Raises</td>
          </tr>
          <tr>
          <td className="arm-split-day">Tuesday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
          <tr>
            <td className="arm-split-day">Wednesday</td>
            <td className="arm-split-workout">Leg Press, Hamstring Curls, Calf Raises</td>
          </tr>
          <tr>
          <td className="arm-split-day">Thursday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
          <tr>
            <td className="arm-split-day">Friday</td>
            <td className="arm-split-workout">Leg Extensions, Squats, Calf Raises</td>
          </tr>
          <tr>
          <td className="arm-split-day">Saturday</td>
          <td className="arm-split-workout">Cardio Focus Day</td>
        </tr>
        <tr>
          <td className="arm-split-day">Sunday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
        </tbody>
      </table>
    </div>

            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)