import React from "react";
import "../css/stylebest.css";

// Trainer image imports
import Guy1 from "../assets/Guy1.jpg";
import Girl1 from "../assets/Girl1.jpg";
import Guy2 from "../assets/Guy2.jpg";
import Girl2 from "../assets/Girl2.jpg";
import Guy3 from "../assets/Guy3.jpg";
import Girl3 from "../assets/Girl3.jpg";

function TrainerSelect() {
  return (
    <div>
      <p className="hometext">Who would you like to book with?</p>

      <div className="trainer-container">
        <div className="trainer-card">
          <img src={Guy1} alt="Trainer 1" />
          <h2>John Doe</h2>
          <p>John is an experienced trainer specializing in weight loss and strength training.</p>
          <a href="Guy1Book.html" className="button-link">Select John</a>
        </div>

        <div className="trainer-card">
          <img src={Girl1} alt="Trainer 2" />
          <h2>Jane Smith</h2>
          <p>Jane has expertise in yoga, pilates, and flexibility training for all levels.</p>
          <a href="Girl1Book.html" className="button-link">Select Jane</a>
        </div>

        <div className="trainer-card">
          <img src={Guy2} alt="Trainer 3" />
          <h2>Michael Johnson</h2>
          <p>Michael focuses on endurance, high-intensity interval training, and sports coaching.</p>
          <a href="Guy2Book.html" className="button-link">Select Michael</a>
        </div>
      </div>

      <div className="trainer-container2">
        <div className="trainer-card">
          <img src={Girl2} alt="Trainer 4" />
          <h2>Lisa Adams</h2>
          <p>Lisa specializes in bodybuilding, powerlifting, and advanced strength training.</p>
          <a href="Girl2Book.html" className="button-link">Select Lisa</a>
        </div>

        <div className="trainer-card">
          <img src={Guy3} alt="Trainer 5" />
          <h2>Tom Wilson</h2>
          <p>Tom is an expert in crossfit, functional fitness, and group training sessions.</p>
          <a href="Guy3Book.html" className="button-link">Select Tom</a>
        </div>

        <div className="trainer-card">
          <img src={Girl3} alt="Trainer 6" />
          <h2>Emily Davis</h2>
          <p>Emily offers specialized training for rehabilitation and injury prevention.</p>
          <a href="Girl3Book.html" className="button-link">Select Emily</a>
        </div>
      </div>
    </div>
  );
}

export default TrainerSelect;
