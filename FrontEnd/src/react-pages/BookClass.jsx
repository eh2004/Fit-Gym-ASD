import React from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

// Image Imports 
import pilates from '../assets/pilates.jpg';
import crossfit from '../assets/crossfit.jpg';
import weighttraining from '../assets/weight-training.jpg';
import cardio from '../assets/cardio.jpg';
import HIIT from '../assets/HIIT.jpg';
import boxing from '../assets/boxing.jpg';

function App() {
  // Check if the user is logged in by checking localStorage
  const isLoggedIn = localStorage.getItem("loggedInUser");

  // Function to handle gym class booking redirection
  const handleBooking = (event, className) => {
    event.preventDefault(); // Prevent default link behavior
    if (isLoggedIn) {
      // If logged in, navigate to the booking page for the selected class
      window.location.href = `/src/pages/book${className}`;
    } else {
      // If not logged in, navigate to the login page
      window.location.href = "/src/pages/login.html";
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="gym-booking-container">
        <a href="../pages/bookPilates" className="gym-class-card" onClick={(e) => handleBooking(e, "Pilates")}>
          <img src={pilates} alt="Pilates" className="gym-class-image" />
          <div className="gym-class-info">
            <h3 className="gym-class-title">Pilates</h3>
            <p className="gym-class-description">Strengthen your core and improve your flexibility with our Pilates classes.</p>
          </div>
        </a>

        <a href="../pages/bookCrossfit" className="gym-class-card" onClick={(e) => handleBooking(e, "Crossfit")}>
          <img src={crossfit} alt="CrossFit" className="gym-class-image" />
          <div className="gym-class-info">
            <h3 className="gym-class-title">CrossFit</h3>
            <p className="gym-class-description">Join our high-intensity CrossFit workouts to build strength and endurance.</p>
          </div>
        </a>

        <a href="../pages/bookWeightTraining" className="gym-class-card" onClick={(e) => handleBooking(e, "WeightTraining")}>
          <img src={weighttraining} alt="Weight Training" className="gym-class-image" />
          <div className="gym-class-info">
            <h3 className="gym-class-title">Weight Training</h3>
            <p className="gym-class-description">Enhance your muscle growth and strength with guided weight training sessions.</p>
          </div>
        </a>

        <a href="../pages/bookCardio" className="gym-class-card" onClick={(e) => handleBooking(e, "Cardio")}>
          <img src={cardio} alt="Cardio" className="gym-class-image" />
          <div className="gym-class-info">
            <h3 className="gym-class-title">Cardio</h3>
            <p className="gym-class-description">Get your heart rate up and burn calories with our energetic cardio workouts.</p>
          </div>
        </a>

        <a href="../pages/bookHIIT" className="gym-class-card" onClick={(e) => handleBooking(e, "HIIT")}>
          <img src={HIIT} alt="HIIT" className="gym-class-image" />
          <div className="gym-class-info">
            <h3 className="gym-class-title">HIIT</h3>
            <p className="gym-class-description">Push your limits with high-intensity interval training sessions for all levels.</p>
          </div>
        </a>

        <a href="../pages/bookBoxing" className="gym-class-card" onClick={(e) => handleBooking(e, "Boxing")}>
          <img src={boxing} alt="Boxing" className="gym-class-image" />
          <div className="gym-class-info">
            <h3 className="gym-class-title">Boxing</h3>
            <p className="gym-class-description">Improve your technique and conditioning with our expert-led boxing classes.</p>
          </div>
        </a>
      </div>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
