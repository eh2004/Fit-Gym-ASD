import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/stylebest.css"

function App() {
    return (
        <React.Fragment>
            <Header />
            <p className="hometext">What would you like to book?</p>
            <div className="wrapper">
                <a href="bookclass.html" className="imgbox-z">
                    <img src="../assets/classes.jpg" alt="Classes" className="child bg-one" />
                    <span>Classes</span>
                </a>
                <a href="booktrainer.html" className="imgbox-z">
                    <img src="../assets/trainer.jpg" alt="Trainers" className="child bg-two" />
                    <span>Trainers</span>
                </a>
            </div>
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);