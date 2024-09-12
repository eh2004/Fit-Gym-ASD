import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

// Image Imports 
import trainerImage from '../assets/trainer.jpg';
import Guy1 from '../assets/Guy1.jpg';

function App() {
    
    return (
        <Fragment>
            <Header />
            <div className="gym-home-header">
                <h1>Fit Gym Australia</h1>
                <h2>Welcome to our website, need a hand...?</h2>

                <div className="gym-home-buttons-container">
                    <a href="login-register.html" className="gym-home-button" style={{ gridColumn: '1' }}>
                        <img src={trainerImage} alt="Login/Register" />
                        <span className="button-text">Login/Register</span>
                    </a>
                    <a href="bookclass.html" className="gym-home-button" style={{ gridColumn: '2' }}>
                        <img src={Guy1} alt="Book a Class" />
                        <span className="button-text">Book a Class</span>
                    </a>
                    <a href="BookTrainer.html" className="gym-home-button" style={{ gridColumn: '1' }}>
                        <img src={trainerImage} alt="Book with a Trainer" />
                        <span className="button-text">Book With a Trainer</span>
                    </a>

                    <a href="Dashboard.html" className="gym-home-button" style={{ gridColumn: '2' }}>
                        <img src={trainerImage} alt="View Trainers" />
                        <span className="button-text">View Trainers</span>
                    </a>
                    <a href="AboutUs.html" className="gym-home-button" style={{ gridColumn: '1' }}>
                        <img src={trainerImage} alt="About Us" />
                        <span className="button-text">About Us</span>
                    </a>

                    <h1 className="gym-home-motto gym-home-motto-part">1% Better Everyday</h1>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);