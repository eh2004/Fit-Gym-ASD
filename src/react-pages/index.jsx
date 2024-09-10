import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

// Image Imports 
import trainerImage from '../assets/trainer.jpg';
import Guy1 from '../assets/Guy1.jpg';

function App() {
    const [mottoPart1Visible, setMottoPart1Visible] = useState(false);
    const [mottoPart2Visible, setMottoPart2Visible] = useState(false);

    useEffect(() => {
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 50) {
                setMottoPart1Visible(true); 
            } else {
                setMottoPart1Visible(false); 
            }

            if (scrollPosition > 150) {
                setMottoPart2Visible(true); 
            } else {
                setMottoPart2Visible(false); 
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); 

    return (
        <Fragment>
            <Header />
            <div className="gym-home-header">
                <h1>Fit Gym Australia</h1>
                <h2>Welcome to our website, need a hand...?</h2>
                
                <div className="gym-home-buttons-container">
                    <a href="login-register.html" className="gym-home-button gym-home-button-left">
                        <img src={trainerImage} alt="Login/Register" />
                        <span>Login/Register</span>
                    </a>
                    <a href="bookclass.html" className="gym-home-button gym-home-button-right">
                        <img src={Guy1} alt="Book a Class" />
                        <span>Book a Class</span>
                    </a>
                    <a href="BookTrainer.html" className="gym-home-button gym-home-button-left">
                        <img src={trainerImage} alt="Book with a Trainer" />
                        <span>Book With a Trainer</span>
                    </a>

                    <h1 className="gym-home-motto gym-home-motto-part"style={{ opacity: mottoPart1Visible ? "1" : "0" }}>Be 1% Better</h1>
                <h1 className="gym-home-motto gym-home-motto-part" style={{ opacity: mottoPart2Visible ? "1" : "0" }}>
                    Than Yesterday
                </h1>

                    <a href="Dashboard.html" className="gym-home-button gym-home-button-right">
                        <img src={trainerImage} alt="View Trainers" />
                        <span>View Trainers</span>
                    </a>
                    <a href="AboutUs.html" className="gym-home-button gym-home-button-left">
                        <img src={trainerImage} alt="About Us" />
                        <span>About Us</span>
                    </a>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
