import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserList from "../components/UserList";
import "../css/styling.css";
import ReusableLineGraph from "../components/LineGraph";
import { armsData, legsData, upperBodyData } from "../data/workoutData"; 
import AddUserForm from "../components/UserAdd";
import EditUserForm from "../components/UserEdit";
import CustomerList from "../components/CustomerList";


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

  

  return (
    <React.Fragment>
      <Header />
      <div>
        <h1>Personal Progress</h1>
      </div>

      <CustomerList/>
      <UserList/>
      <AddUserForm/>
      <EditUserForm/>

      {/* Buttons */}
      <div className="button-container">
        <button onClick={handleSwitchToLegs}>Show Legs Progress</button>
        <button onClick={handleSwitchToUpperBody}>Show Upper Body Progress</button>
        <button onClick={handleSwitchtoArms}>Show Arms Progress</button>
      </div>

      {/* Displays the data */}
      <div className="graphs-container">
        <ReusableLineGraph title={selectedTitle} data={selectedData} />
      </div>

      <Footer />
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
