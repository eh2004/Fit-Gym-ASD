import React from "react";
import TrainerProfile from "../components/TrainerProfile.jsx";
// import CustomerList from './CustomerList';
// import ClientProgress from './ClientProgress';
import WorkingTime from "../components/WorkingTime.jsx";


function Dashboard() {
  return (
    <div className="dashboard">
      <TrainerProfile />
      <div className="dashboard-content">
        <WorkingTime />
        
      </div>
    </div>
  );
}

export default Dashboard;