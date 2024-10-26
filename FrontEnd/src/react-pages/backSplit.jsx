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
      <h1 className="arm-split-title">Back Workout Split</h1>

      <h2 className="arm-split-subtitle">Exercises to Target Back Muscles</h2>
      <ul className="arm-split-exercise-list">
        <li className="arm-split-exercise-item">Pull-Ups - 4 sets of 8 reps (Targets: Lats, Upper Back)</li>
        <li className="arm-split-exercise-item">Lat Pulldowns - 3 sets of 12 reps (Targets: Lats)</li>
        <li className="arm-split-exercise-item">Seated Rows - 3 sets of 10 reps (Targets: Mid Back)</li>
        <li className="arm-split-exercise-item">Deadlifts - 4 sets of 8 reps (Targets: Lower Back, Glutes)</li>
        <li className="arm-split-exercise-item">Face Pulls - 3 sets of 12 reps (Targets: Rear Deltoids, Upper Back)</li>
      </ul>

      <h2 className="arm-split-subtitle">Weekly Back Workout Split</h2>
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
          <td className="arm-split-workout">Rest</td>
        </tr>
        <tr>
          <td className="arm-split-day">Tuesday</td>
          <td className="arm-split-workout">Cardio Focus Day</td>
        </tr>
          <tr>
            <td className="arm-split-day">Wednesday</td>
            <td className="arm-split-workout">Pull-Ups, Lat Pulldowns, Seated Rows</td>
          </tr>
          <tr>
          <td className="arm-split-day">Thursday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
          <tr>
            <td className="arm-split-day">Friday</td>
            <td className="arm-split-workout">Deadlifts, Face Pulls, Pull-Ups</td>
          </tr>
          <tr>
          <td className="arm-split-day">Saturday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
          <tr>
            <td className="arm-split-day">Sunday</td>
            <td className="arm-split-workout">Seated Rows, Lat Pulldowns, Deadlifts</td>
          </tr>
          
        </tbody>
      </table>
    </div>

            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)