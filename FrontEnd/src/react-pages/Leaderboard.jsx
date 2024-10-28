import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/styling.css";
import LeaderboardUniversal from "../components/LeaderboardUniversal.jsx";
import PersonalBestLeaderboard from "../components/LeadboardUser.jsx";
import StreakDisplay from "../components/StreakDisplay.jsx";
import React, { useState, useEffect } from "react";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Fetch the logged-in user from localStorage or redirect to login
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
            setLoggedInUser(storedUser);
        } else {
            // Redirect to the login page if no user is logged in
            window.location.href = "/src/pages/login.html";
        }
    }, []);

    if (!loggedInUser) {
        // Render a loading state until the user data is available
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="navbar">
                <Header />
            </div>

            <div className="main-content">
                <div className="streak-display">
                    <StreakDisplay customer={{ id: loggedInUser }} />
                </div>

                <div className="leaderboard-section">

                    <LeaderboardUniversal />
                </div>

                <div className="leaderboard-section">
                    <PersonalBestLeaderboard customer={{ id: loggedInUser }} />
                </div>
            </div>

            <Footer />
        </>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
