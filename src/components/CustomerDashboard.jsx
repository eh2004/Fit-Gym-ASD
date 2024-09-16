import React from "react";
import CustomerProfile from "./CustomerProfile.jsx";
import Booking from "./Booking"; // Assuming you want booking to appear here too

function CustomerDashboard() {
  return (
    <div className="dashboard">
      <CustomerProfile />
      <div className="dashboard-content">
        <Booking />
        {/* You can add other components here, such as tracking workout progress */}
      </div>
    </div>
  );
}

export default CustomerDashboard;