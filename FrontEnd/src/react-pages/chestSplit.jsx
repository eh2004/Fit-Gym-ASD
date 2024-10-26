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
      <h1 className="arm-split-title">Chest Workout Split</h1>

      <h2 className="arm-split-subtitle">Exercises to Target Chest Muscles</h2>
      <ul className="arm-split-exercise-list">
        <li className="arm-split-exercise-item">Bench Press - 4 sets of 10 reps (Targets: Pectorals)</li>
        <li className="arm-split-exercise-item">Incline Dumbbell Press - 3 sets of 12 reps (Targets: Upper Chest)</li>
        <li className="arm-split-exercise-item">Chest Flys - 3 sets of 15 reps (Targets: Pectorals)</li>
        <li className="arm-split-exercise-item">Push-Ups - 3 sets of 20 reps (Targets: Chest, Triceps)</li>
        <li className="arm-split-exercise-item">Dips - 3 sets of 12 reps (Targets: Lower Chest, Triceps)</li>
      </ul>

      <h2 className="arm-split-subtitle">Weekly Chest Workout Split</h2>
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
          <td className="arm-split-workout">Cario Focus Day</td>
        </tr>
          <tr>
            <td className="arm-split-day">Tuesday</td>
            <td className="arm-split-workout">Bench Press, Push-Ups, Incline Dumbbell Press</td>
          </tr>
          <tr>
          <td className="arm-split-day">Wednesday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
          <tr>
            <td className="arm-split-day">Thursday</td>
            <td className="arm-split-workout">Chest Flyes, Dips, Push-Ups</td>
          </tr>
          <tr>
          <td className="arm-split-day">Friday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
          <tr>
            <td className="arm-split-day">Saturday</td>
            <td className="arm-split-workout">Bench Press, Incline Dumbbell Press, Chest Flys</td>
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