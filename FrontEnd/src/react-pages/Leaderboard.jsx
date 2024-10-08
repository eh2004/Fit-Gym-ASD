//import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"
import Leaderboard from "../components/GlobalLeaderboard.jsx";
import React, { useState, useEffect } from 'react';


const App = () => {
    return (
        <React.Fragment>
            <Header />
                <Leaderboard />
            <Footer />
        </React.Fragment>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);