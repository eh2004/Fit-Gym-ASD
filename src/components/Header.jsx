import React from "react"
import "../css/styling.css"
import navimg from "../assets/nav-bar-image.jpg"
import profile from "../assets/profile.png"

function Header() {

    return (
        //Profile will have dropdown: view profile, transaction history, logout for logged in user and register and login for others.
        //List items to be changed
        <React.Fragment>
        <nav>
        <img src={navimg} id="nav-image" />
        <ul className="nav-items-ul">
            <li className="nav-li" id="logo"><a href="/index.html">Fit Gym<br/><span id="slogan">#1 Imaginary Gym</span></a></li>
            <li className="nav-li"><a href="/index.html">Home</a></li>
            <li className="nav-li"><a href="/src/pages/AboutUs.html">About</a></li>
            <li className="nav-li"><a href="/src/pages/Progress.html">Progress</a></li>
            <li className="nav-li"><a href="/src/pages/Leaderboard.html">Leaderboard</a></li>
            <li className="nav-li"><a href="">Classes</a></li>
            <li className="nav-li"><a href="">Trainers</a></li>
            <li><a href=""><img src={profile} id="profile"/></a></li>
            </ul>
        </nav>
        </React.Fragment>
    )
}

export default Header
