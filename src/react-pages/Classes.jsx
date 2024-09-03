import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/stylebest.css"

function App() {
    return (
        <React.Fragment>
        <Header />
            <p class = "hometext">What would you like to book?</p>

            <div class="wrapper">
            <a href="classes.html" class="imgbox-z">
                <div class="child bg-one">
                <span>Classes</span>
                </div>
            </a>
            <a href="dashboard.html" class="imgbox-z">
                <div class="child bg-two">
                <span>Trainers</span>
                </div>
            </a>
            </div>
        <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);