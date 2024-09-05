import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/stylebest.css"

function App() {
    return (
        <React.Fragment>
            <Header />
            <p className="hometext">Who would you like to book with?</p>
            <div class="trainer-card">
            <img src="trainer1.jpg" alt="Trainer 1"/>
            <h2>John Doe</h2>
            <p>John is an experienced trainer specializing in weight loss and strength training.</p>
            <button>Select John</button>
        </div>
        
        <div class="trainer-card">
            <img src="trainer2.jpg" alt="Trainer 2"/>
            <h2>Jane Smith</h2>
            <p>Jane has expertise in yoga, pilates, and flexibility training for all levels.</p>
            <button>Select Jane</button>
        </div>

        <div class="trainer-card">
            <img src="trainer3.jpg" alt="Trainer 3"/>
            <h2>Michael Johnson</h2>
            <p>Michael focuses on endurance, high-intensity interval training, and sports coaching.</p>
            <button>Select Michael</button>
        </div>
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);