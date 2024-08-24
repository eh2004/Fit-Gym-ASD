import React from "react"
import "../css/styling.css"
import facebook_icon from "../assets/facebook-icon.png"
import instagram_icon from "../assets/instagram-icon.png"
import twitter_icon from "../assets/twitter-icon.png"

function Footer() {
    return (
        <footer>
            <p>+61 2 1234 5678</p>
            <img src={facebook_icon} alt="Facebook icon"/>
            <img src={instagram_icon} alt="Instagram icon"/>
            <img src={twitter_icon} alt="Twitter icon"/>
            <p>fit.gym@gmail.com</p>
        </footer>
    )
}

export default Footer