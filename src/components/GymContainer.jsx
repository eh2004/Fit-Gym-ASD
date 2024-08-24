import React from "react"
import "../css/styling.css"
import gym1 from "../assets/gym1.jpg";

function GymContainer() {

    return (
        <div className="gym-container">
          <img src={gym1}/>
          <h3>Gym Location</h3>
          <p>123 Example Street, Example Suburb, NSW 2000</p>
          <p>+61 2 1234 5678</p>
        </div>
    )
}

export default GymContainer
