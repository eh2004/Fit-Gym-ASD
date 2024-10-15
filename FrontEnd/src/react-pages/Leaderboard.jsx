import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"
import LeaderboardUniversal from "../components/LeaderboardUniversal.jsx";
import PersonalBestLeaderboard from "../components/LeadboardUser.jsx"
import React, { useState, useEffect } from 'react';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    useEffect(() => {
        // Fetch the logged-in user from localStorage or redirect to login
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        } else {
            // If no user is logged in, redirect to the login page
            window.location.href = "/src/pages/login.html";
        }
    }, []);

    if (!loggedInUser) {
        // Render a loading state until the user data is available
        return <div>Loading...</div>;
    }

    return (
        <>
        <div class="leaderboard-container footer-space">
            <Header />
                <LeaderboardUniversal />
                {/* Pass the logged-in user's id and first_name to LeadboardUser <LeaderboardUser customer={{ id: loggedInUser}} /> */}
                <PersonalBestLeaderboard customer={{id: loggedInUser}} />
            <Footer />
        </div>
        </>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
