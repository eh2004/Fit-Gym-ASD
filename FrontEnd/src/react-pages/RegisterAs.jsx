import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"

function App() {
    return (
        <React.Fragment>
            <Header />
            <h1>Join Our Gym</h1>
            <div className="options-container">
            <div className="register-outer-div trainer-option">
                <div className="register-inner-div">
                    <a href="../pages/RegistrationTrainer.html">Register as a trainer</a>
                </div>
            </div>
            <div className="register-outer-div customer-option">
                <div className="register-inner-div">
                    <a href="../pages/SignUp.html">Register as a customer</a>
                </div>
            </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)