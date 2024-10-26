import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

function App() {

   

    return (
        <React.Fragment>
            <Header />
            <p className="hometext">Select a focus muscle group:</p>
            <div className="wrapper">
                <a href="armSplit.html" className="imgbox-z"><img src="../assets/armMuscles.jpg" alt="armMuscles" className="child bg-one" /><span>Arm Focused Split</span></a>
                <a href="chestSplit.html" className="imgbox-z"><img src="../assets/chestMuscles.jpg" alt="chestMuscles" className="child bg-two" /><span>Chest Focused Split</span></a>
                <a href="backSplit.html" className="imgbox-z"><img src="../assets/backMuscles.jpg" alt="backMuscles" className="child bg-one" /><span>Back Focused Split</span></a>
                <a href="legSplit.html" className="imgbox-z"><img src="../assets/legMuscles.jpg" alt="legMuscles" className="child bg-two" /><span>Leg Focused Split</span></a>
            </div>

            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)