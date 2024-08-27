import React from "react";
import profileImage from "../assets/profile.jpeg";

function TrainerProfile() {
  return (
    <div className="trainer-profile">
      <img src= {profileImage} alt="Trainer" className="trainer-image" />
      <div className="trainer-info">
        <h2>Natalie Stann</h2>
        <p>Bio: I’m meow meow</p>
        <p>E-mail: Placeholder@gmail.com</p>
        <p>Phone: 04568888888</p>
        <p>Address: blah blah blah</p>
        <p>Speciality Area: Posture, Weight Loss</p>
        <p>Certification: Certification Name</p>
        <p>Language: English</p>
      </div>
    </div>
  );
}

export default TrainerProfile;