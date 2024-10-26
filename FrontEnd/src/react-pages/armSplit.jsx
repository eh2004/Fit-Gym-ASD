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
    <h1 className="arm-split-title">Arm Workout Split</h1>

    <h2 className="arm-split-subtitle">Exercises to Target Arm Muscles</h2>
    <ul className="arm-split-exercise-list">
  <li className="arm-split-exercise-item">Bicep Curls - 3 sets of 12 reps (Targets: Biceps)</li>
  <li className="arm-split-exercise-item">Hammer Curls - 3 sets of 10 reps (Targets: Brachialis, Biceps)</li>
  <li className="arm-split-exercise-item">Tricep Dips - 3 sets of 15 reps (Targets: Triceps)</li>
  <li className="arm-split-exercise-item">Overhead Tricep Extension - 3 sets of 12 reps (Targets: Triceps, Long Head)</li>
  <li className="arm-split-exercise-item">Preacher Curls - 3 sets of 10 reps (Targets: Biceps, Brachialis)</li>
  <li className="arm-split-exercise-item">Skull Crushers - 3 sets of 12 reps (Targets: Triceps)</li>
  <li className="arm-split-exercise-item">Concentration Curls - 3 sets of 10 reps (Targets: Biceps)</li>
  <li className="arm-split-exercise-item">Tricep Pushdowns - 3 sets of 15 reps (Targets: Triceps)</li>
</ul>


    <h2 className="arm-split-subtitle">Weekly Arm Workout Split</h2>
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
          <td className="arm-split-workout">Bicep Curls, Hammer Curls, Tricep Dips</td>
        </tr>
        <tr>
          <td className="arm-split-day">Tuesday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
        <tr>
          <td className="arm-split-day">Wednesday</td>
          <td className="arm-split-workout">Overhead Tricep Extension, Preacher Curls, Skull Crushers</td>
        </tr>
        <tr>
          <td className="arm-split-day">Thursday</td>
          <td className="arm-split-workout">Rest</td>
        </tr>
        <tr>
          <td className="arm-split-day">Friday</td>
          <td className="arm-split-workout">Concentration Curls, Tricep Pushdowns, Bicep Curls</td>
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