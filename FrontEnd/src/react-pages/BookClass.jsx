import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/stylebest.css"


// Image Imports 
import pilates from '../assets/pilates.jpg';
import crossfit from '../assets/crossfit.jpg';
import weighttraining from '../assets/weight-training.jpg';
import cardio from '../assets/cardio.jpg';
import HIIT from '../assets/HIIT.jpg';
import boxing from '../assets/boxing.jpg';

function App() {
    return (
        <React.Fragment>
            <Header />
            <div class="gym-booking-container">
    <a href="#" class="gym-class-card">
        <img src={pilates} alt="Pilates" class="gym-class-image"/>
        <div class="gym-class-info">
        <h3 class="gym-class-title">Pilates</h3>
            <p class="gym-class-description">Strengthen your core and improve your flexibility with our Pilates classes.</p>
        </div>
    </a>

    <a href="#" class="gym-class-card">
        <img src={crossfit} alt="CrossFit" class="gym-class-image"/>
        <div class="gym-class-info">
            <h3 class="gym-class-title">CrossFit</h3>
            <p class="gym-class-description">Join our high-intensity CrossFit workouts to build strength and endurance.</p>
        </div>
    </a>

    <a href="#" class="gym-class-card">
        <img src={weighttraining} alt="Weight Training" class="gym-class-image"/>
        <div class="gym-class-info">
            <h3 class="gym-class-title">Weight Training</h3>
            <p class="gym-class-description">Enhance your muscle growth and strength with guided weight training sessions.</p>
        </div>
    </a>

    <a href="#" class="gym-class-card">
        <img src={cardio} alt="Cardio" class="gym-class-image"/>
        <div class="gym-class-info">
            <h3 class="gym-class-title">Cardio</h3>
            <p class="gym-class-description">Get your heart rate up and burn calories with our energetic cardio workouts.</p>
        </div>
    </a>

    <a href="#" class="gym-class-card">
        <img src={HIIT} alt="HIIT" class="gym-class-image"/>
        <div class="gym-class-info">
            <h3 class="gym-class-title">HIIT</h3>
            <p class="gym-class-description">Push your limits with high-intensity interval training sessions for all levels.</p>
        </div>
    </a>

    <a href="#" class="gym-class-card">
        <img src={boxing} alt="Boxing" class="gym-class-image"/>
        <div class="gym-class-info">
            <h3 class="gym-class-title">Boxing</h3>
            <p class="gym-class-description">Improve your technique and conditioning with our expert-led boxing classes.</p>
        </div>
    </a>
</div>
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);