import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressLineGraphByUser from "../components/LineGraphByUser";

const App = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null); // Default shows all workouts

  const handleShowArms = () => setSelectedMuscleGroup('Arms');
  const handleShowChest = () => setSelectedMuscleGroup('Chest');
  const handleShowLegs = () => setSelectedMuscleGroup('Legs');

  return (
    <>
      <h1>Workout Progress</h1>
      <div>
        <button onClick={handleShowArms}>Show Arms Workouts</button>
        <button onClick={handleShowChest}>Show Chest Workouts</button>
        <button onClick={handleShowLegs}>Show Leg Workouts</button>
      </div>
      <ProgressLineGraphByUser customer={{ id: 1 }} selectedMuscleGroup={selectedMuscleGroup} />
    </>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
