import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import CarouselLearning from "../components/CarouselLearning.jsx";
import "../css/stylebest.css"

function App() {
    return (
        <Fragment>
        <Header />
        <h1>Find Gym Help Here</h1>
        <CarouselLearning />
        <div className="LearnHub-Description">
            <p className="LearnHub-Description"> This page is designed to provide comprehensive information about the gym, its equipment, and how each piece can help you achieve your fitness goals. Whether you're a beginner or a seasoned athlete, you'll find detailed descriptions of various machines, free weights, and exercise tools, along with explanations of how they work and what muscle groups they target.</p>
            <p className="LearnHub-Description"> Our goal is to guide you in understanding how to use the equipment safely and effectively, empowering you to make the most out of your workout routines. With clear visuals and step-by-step instructions, this resource is perfect for anyone looking to build strength, improve endurance, or simply learn more about fitness techniques. Start exploring and enhance your fitness journey today!</p>
        </div>
        
        <Footer />
        </Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

