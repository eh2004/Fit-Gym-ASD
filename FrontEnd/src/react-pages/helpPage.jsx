import React from "react"
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import Carousel from "../components/Carousel.jsx"
import GymsCarousel from "../components/GymsCarousel.jsx"
import "../css/styling.css"

function App() {
    return (
        <React.Fragment>
        <Header />
        <h1>LMAOOO You need help????</h1>
        
        <div className="about-us-info">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur pharetra ipsum. Proin malesuada, est ac tincidunt ultrices, risus quam posuere neque, vitae imperdiet urna est et ipsum. Sed porttitor magna nec diam maximus iaculis. Pellentesque elementum leo at gravida ultrices. Vivamus eu condimentum nisl, laoreet tempor ipsum. Quisque eleifend vulputate posuere. Nunc dictum erat tortor, vel pharetra justo consequat at. Proin et finibus est, et venenatis enim. Proin ligula risus, tincidunt sed urna vel, bibendum ullamcorper diam. In hac habitasse platea dictumst. Curabitur semper vulputate sem sodales blandit. Proin et justo tellus.</p>
        </div>
        
        <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

