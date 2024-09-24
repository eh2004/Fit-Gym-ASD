import React from "react";
import Guy1 from "../assets/Guy1.jpg"; 
import UserBookCalendar from "../components/UserBookCalendar.jsx";

function Guy1Page() {
  return (
    <div className="trainer-profile-container">
      
      <div className="trainer-profile-left">
        <img src={Guy1} alt="John Doe" className="profile-photo" />
        <div className="trainer-bio">
          <h2>John Doe</h2>
          <p><strong>Age:</strong> 35</p>
          <p><strong>Email:</strong> john.doe@fitgym.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Preferred Language:</strong> English</p>
          <p><strong>Favorite Workout:</strong> High-Intensity Interval Training (HIIT)</p>
        </div>
      </div>
      
      
      <div className="trainer-profile-middle">
        <p className="trainer-message-box">Hello, I am John</p>
        <UserBookCalendar />
      </div>
    </div>
  );
}

export default Guy1Page;
