import React, {useState, useEffect} from "react"
import "../css/styling.css"
import navimg from "../assets/nav-bar-image.jpg"
import profile from "../assets/profile.png"


function ProfileDropDown() {
    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "/src/pages/Login.html";
    };

    return (
        <div className="profile-dropdown">
            <a href="">Profile</a>
            <a href="/src/pages/Transactions.html">Transaction History</a>
            <a href="" onClick={handleLogout}>Logout</a>
        </div>
    )
}

function UnregisteredDropDown() {
    return (
        <div className="profile-dropdown">
            <a href="/src/pages/RegisterAs.html">Sign Up</a>
            <a href="/src/pages/Login.html">Login</a>
            <a href="/src/pages/helpLMAO.html">Help</a>
        </div>
    )
}

function Header() {

    const[isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
          setIsLoggedIn(true);
        }
      }, []);

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
            {isLoggedIn ? (
                <React.Fragment>
                <li className="nav-li"><a href="/src/pages/Progress.html">Progress</a></li>
                <li className="nav-li long-nav-name"><a href="/src/pages/ExerciseRecording.html">Rep Counter</a></li>
                <li className="nav-li"><a href="/src/pages/Leaderboard.html">Leaderboard</a></li>
                <li className="nav-li"><a href="/src/pages/BookingType.html">Book</a></li>
                <li className="nav-li"><a href="/src/pages/Dashboard.html">Trainers</a></li>
                <li className="nav-li"><a href="/src/pages/CustomerDashboard.html">Customers</a></li>
                </React.Fragment>
            ) : ("") }
            <div className="profile-container">
                <li><a href=""><img src={profile} id="profile"/></a></li>
                {isLoggedIn ? (<ProfileDropDown />) : (<UnregisteredDropDown />)}
            </div>
        </ul>
        </nav>
        </React.Fragment>
    )
}

export default Header
