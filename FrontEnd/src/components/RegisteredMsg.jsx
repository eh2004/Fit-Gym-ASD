import React from "react"

export default function RegisteredMessage() {
    return (
    <React.Fragment>
    <h1>Welcome to Fit Gym!</h1>
    <div className="welcome-msg">
        <p>Please log in to view all our features.</p>
        <img src="../assets/logo-colour-inverse.png"/>
        <a className="goto-login" href="../pages/Login.html">Login</a>
    </div>
    </React.Fragment>
    );
}