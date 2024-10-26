import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

function App() {

   

    return (
        <React.Fragment>
            <Header />
            <div className="workout-splits-grid">
      <div className="workout-splits-button" style={{ backgroundImage: "../pages/bookPilates.html" }}>
        <span className="workout-splits-text">Button 1</span>
      </div>
      <div className="workout-splits-button" style={{ backgroundImage: "url('image2.jpg')" }}>
        <span className="workout-splits-text">Button 2</span>
      </div>
      <div className="workout-splits-button" style={{ backgroundImage: "url('image3.jpg')" }}>
        <span className="workout-splits-text">Button 3</span>
      </div>
      <div className="workout-splits-button" style={{ backgroundImage: "url('image4.jpg')" }}>
        <span className="workout-splits-text">Button 4</span>
      </div>
    </div>

            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)