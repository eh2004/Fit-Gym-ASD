import React from "react"
import "../css/styling.css"
import navimg from "../assets/nav-bar-image.jpg"
import profile from "../assets/profile.png"


function ProfileDropDown() {
    return (
        <div className="profile-dropdown">
            <a href="">Profile</a>
            <a href="">Transaction History</a>
            <a href="">Logout</a>
        </div>
    )
}

function Header() {

    return (
        //Profile will have dropdown: view profile, transaction history, logout for logged in user and register and login for others.
        //List items to be changed
        <React.Fragment>
        <nav>
        <img src={navimg} id="nav-image" />
        <ul className="nav-items-ul">
            <li className="nav-li" id="logo"><a href="/index.html"><img src="/src/assets/logo.png" alt="Fit Gym Logo" id="logo-image" style={{width: 80}}/></a></li>
            <li className="nav-li"><a href="/index.html">Home</a></li>
            <li className="nav-li"><a href="/src/pages/AboutUs.html">About</a></li>
            <li className="nav-li"><a href="/src/pages/Progress.html">Progress</a></li>
            <li className="nav-li"><a href="/src/pages/Leaderboard.html">Leaderboard</a></li>
            <li className="nav-li"><a href="">Classes</a></li>
            <li className="nav-li"><a href="/src/pages/Dashboard.html">Trainers</a></li>
            <div className="profile-container">
                <li><a href=""><img src={profile} id="profile"/></a></li>
                <ProfileDropDown />
            </div>
        </ul>
        </nav>
        </React.Fragment>
    )
}

export default Header
