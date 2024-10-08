import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressLineGraphByUser from "../components/LineGraphByUser";

const App = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null); // Default shows all workouts
  const [loggedInUser, setLoggedInUser] = useState(null); // Store logged in user

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
    } else {
      // If no user is logged in, redirect to the login page
      window.location.href = "/src/pages/login.html";
    }
  }, []);

  const handleShowArms = () => setSelectedMuscleGroup('Arms');
  const handleShowChest = () => setSelectedMuscleGroup('Chest');
  const handleShowLegs = () => setSelectedMuscleGroup('Legs');

  if (!loggedInUser) {
    return <h1>Loading...</h1>; // Show a loading state until the user is determined
  }

  return (
    <>
      <Header/>
      <h1>Workout Progress</h1>
      <div>
        <button onClick={handleShowArms}>Show Arms Workouts</button>
        <button onClick={handleShowChest}>Show Chest Workouts</button>
        <button onClick={handleShowLegs}>Show Leg Workouts</button>
      </div>
      {/* Pass the customer ID from the logged-in user to the LineGraphByUser component */}
      <ProgressLineGraphByUser customer={{ id: loggedInUser.id }} selectedMuscleGroup={selectedMuscleGroup} />
      <Footer/>
    </>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
