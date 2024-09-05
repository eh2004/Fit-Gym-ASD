import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/stylebest.css"

function App() {
    return (
        <React.Fragment>
            <Header />
            <p className="hometext">What class you like to book?</p>
            
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);