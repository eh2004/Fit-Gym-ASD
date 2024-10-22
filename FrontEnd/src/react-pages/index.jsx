import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

// Image Imports 
import aboutus from '../assets/about-us.jpg';
import calendar from '../assets/calendar.jpg';
import learning from '../assets/learning.jpg';
import manwalking from '../assets/man-walking-legs.jpg';
import slogan from '../assets/slogan.jpg';
import trainergroup from '../assets/trainer-group.jpg';

function App() {
    
    return (
        <Fragment>
            <Header />
            <div className="gym-home-header">
                <h1>Fit Gym Australia</h1>
                <h2>Welcome to our website, need a hand...?</h2>

                <div className="gym-home-buttons-container">
                    <a href="../src/pages/Login.html" className="gym-home-button" style={{ gridColumn: '1' }}>
                        <img src={manwalking} alt="Login" />
                        <span className="button-text">Login</span>
                    </a>

                    <a href="../src/pages/BookingType.html" className="gym-home-button" style={{ gridColumn: '2' }}>
                        <img src={calendar} alt="Book a Class" />
                        <span className="button-text">Book something</span>
                    </a>

                    <a href="../src/pages/LearnHub.html" className="gym-home-button" style={{ gridColumn: '1' }}>
                        <img src={learning} alt="Book with a Trainer" />
                        <span className="button-text">Learn about the gym</span>
                    </a>

                    <a href="../src/pages/BookTrainer.html" className="gym-home-button" style={{ gridColumn: '2' }}>
                        <img src={trainergroup} alt="View Trainers" />
                        <span className="button-text">View Trainers</span>
                    </a>
                    <a href="../src/pages/AboutUs.html" className="gym-home-button" style={{ gridColumn: '1' }}>
                        <img src={aboutus} alt="About Us" />
                        <span className="button-text">About Us</span>
                    </a>

                    <img src={slogan} alt="Slogan" />

                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);