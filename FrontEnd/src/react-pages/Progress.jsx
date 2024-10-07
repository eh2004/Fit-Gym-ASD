import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserList from "../components/UserList";
import "../css/styling.css";
import LineGraph from "../components/LineGraph";
import { armsData, legsData, upperBodyData } from "../data/workoutData"; 
import AddUserForm from "../components/UserAdd";
import EditUserForm from "../components/UserEdit";
import CustomerList from "../components/CustomerList";
import WorkoutList from "../components/WorkoutList";
import ExerciseList from "../components/ExercisesList";
import SetList from "../components/SetList";
import ProgressLineGraphByUser from "../components/LineGraphByUser";

const App = () => {
  const [selectedData, setSelectedData] = useState(legsData); // Default to legs data
  const [selectedTitle, setSelectedTitle] = useState("Legs Progress");
  // Swap data sets 
  const handleSwitchToLegs = () => {
    setSelectedData(legsData);
    setSelectedTitle("Legs Progress");
  };
  const handleSwitchToUpperBody = () => {
    setSelectedData(upperBodyData);
    setSelectedTitle("Upper Body Progress");
  };
  const handleSwitchtoArms = () =>{
    setSelectedData(armsData);
    setSelectedTitle("Arms Progress");
  }
/* 
<SetList/>
      <ExerciseList/>
      <WorkoutList/>
      <CustomerList/>
      <UserList/>
      <AddUserForm/>
      <EditUserForm/>
*/
  return (
    <React.Fragment>
      <Header />
      <div>
        <h1>Personal Progress</h1>
      </div>
      <ProgressLineGraphByUser customer={{ id: 1 }} />
      {/* Buttons */}
      <div className="button-container">
        <button onClick={handleSwitchToLegs}>Show Legs Progress</button>
        <button onClick={handleSwitchToUpperBody}>Show Upper Body Progress</button>
        <button onClick={handleSwitchtoArms}>Show Arms Progress</button>
      </div>
      {/* Displays the data */}
      <div className="graphs-container">
        <LineGraph title={selectedTitle} data={selectedData} />
      </div>
      <EditUserForm/>
      <Footer />
    </React.Fragment>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
