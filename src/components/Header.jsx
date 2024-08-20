import React from "react"

function Header() {

    return (
        //Profile will have dropdown: view profile, transaction history, logout for logged in user and register and login for others.
        //List items to be changed
        <nav>
            <ul className="nav-items-ul">
                <li><a href="">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Classes</a></li>
                <li><a href="">Trainers</a></li>
                <li><a href="">Profile</a></li>
            </ul>
        </nav>
    )
}

export default Header
