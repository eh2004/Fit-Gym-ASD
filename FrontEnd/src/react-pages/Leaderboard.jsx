import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"
import Leaderboard from "../components/Leaderboard.jsx";

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <div>
                <h1>Leaderboard H </h1>
                <Leaderboard />
            </div>
            <Footer />
        </React.Fragment>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);