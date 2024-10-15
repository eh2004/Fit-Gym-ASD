import React from "react";
import CustomerProfile from "./CustomerProfile.jsx";
import Booking from "./Booking";
import WorkoutProgress from "./WorkoutProgress"; // Import the workout progress component

function CustomerDashboard() {
  const customer = {
    id: 1, // Example customer ID, update it dynamically if needed
    name: "John Doe",
    // Other customer details...
  };

  return (
    <div className="dashboard">
      <CustomerProfile />
      <div className="dashboard-content">
        <Booking />
        <WorkoutProgress customer={customer} />  {/* Add workout progress component */}
      </div>
    </div>
  );
}

export default CustomerDashboard;