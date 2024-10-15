import React from "react";
import ProgressLineGraphByUser from "../components/LineGraphByUser"; // Correct path for the graph

const WorkoutProgress = ({ customer }) => {
  return (
    <div className="workout-progress">
      <h3>Workout Progress</h3>
      <div className="progress-chart-container">
        <ProgressLineGraphByUser customer={customer} selectedMuscleGroup={null} />
      </div>
    </div>
  );
};

export default WorkoutProgress;