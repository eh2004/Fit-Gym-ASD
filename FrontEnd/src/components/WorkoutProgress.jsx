import React from "react";
import ProgressLineGraphByUser from "../components/LineGraphByUser"; // Correct import path

const WorkoutProgress = ({ customer }) => {
  return (
    <div className="workout-progress-section">
      <h3>Workout Progress</h3>
      <ProgressLineGraphByUser customer={customer} selectedMuscleGroup={null} />
    </div>
  );
};

export default WorkoutProgress;