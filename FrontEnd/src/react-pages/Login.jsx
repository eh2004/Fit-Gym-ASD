import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"

function App() {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[userFound, setUserFound] = useState(true);
    const[customersList, setCustomersList] = useState([]);
    const[loggedIn, setLoggedIn] = useState(false);
    const[loggedInName, setLoggedInName] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/api/customers')
        .then(response => response.json())
        .then(data => setCustomersList(data))

        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
          console.log("Stored loggedInUser on this page:", storedUser);
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserFound(false)

        for(let i = 0; i < customersList.length; i++) {
            if(username == customersList[i].username) {
                if(password == customersList[i].password) {
                    console.log("Found!");
                    setLoggedIn(true);
                    setUserFound(true);
                    setLoggedInName(customersList[i].first_name);
                    const id = customersList[i].customer_id;
                    localStorage.setItem("loggedInUser", JSON.stringify({id}));
                    
                    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
                    console.log("Stored customer_id:", storedUser.customerId);

                    setTimeout(() => {
                        window.location.href = "/src/pages/index.html";
                    }, 4000);
                    
                    break;
                }
            }
        }

        if(userFound == false) {
            console.log("Not found");
        }
    };

    function handleFocus() {
        setUserFound(true);
    }

    function LoggedInMsg() {
        return (
        <React.Fragment>
        <h1>Welcome back {loggedInName}!</h1>
        <div className="welcome-msg">
            <p>You will be directed to the home page soon.</p>
            <img src="../assets/logo-colour-inverse.png"/>
        </div>
        </React.Fragment>
        );
    }

    return (
        <React.Fragment>
        <Header />
        {loggedIn ? (<LoggedInMsg />) : (
        <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="register-form login-form">
            <div className="field-container">
                <div className="email-field">
                  <label htmlFor="username">Username</label><br/>
                   <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onFocus={handleFocus}/>
                </div>
            </div>

            <div className="field-container">
                <div className="email-field">
                  <label htmlFor="password">Password</label><br/>
                   <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={handleFocus}/>
                </div>
            </div>

            <div className="error-msg" style={{ visibility: userFound ? 'hidden' : 'visible' }}>Incorrect username or password.</div>
        </div>
        <input className="submit-button" type="submit" value="Login"></input>
        </form>
        </React.Fragment>
        )}
        <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)