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
    const[trainersList, setTrainersList] = useState([]);
    const[loggedIn, setLoggedIn] = useState(false);
    const[loggedInName, setLoggedInName] = useState("");

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3000/api/customers').then((response) => response.json()),
            fetch('http://localhost:3000/api/trainers').then((response) => response.json()),
        ])
        .then(([customerData, trainerData]) => {
            setCustomersList(customerData);
            setTrainersList(trainerData);
        })

        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
          console.log("Stored loggedInUser on this page:", storedUser);
        }
    }, []);

    function validateUser(list, userType) {
        let id;
        for(let i = 0; i < list.length; i++) {
            if(username == list[i].username) {
                if(password == list[i].password) {
                    console.log("Found!");
                    setLoggedIn(true);
                    setUserFound(true);
                    setLoggedInName(list[i].first_name);
                    if(userType == "customer") {
                        id = list[i].customer_id;
                    }
                    else if(userType == "trainer") {
                        id = list[i].trainer_id;
                    }
                    localStorage.setItem("loggedInUser", JSON.stringify({id}));
                    
                    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
                    console.log("Stored id:", storedUser);

                    setTimeout(() => {
                        window.location.href = "/src/pages/index.html";
                    }, 4000);
                    
                    return true;
                }
            }
        }

        return false;   
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isCustomerFound = validateUser(customersList, "customer");
        if(!isCustomerFound) {
            const isTrainerFound = validateUser(trainersList, "trainer");
            if(!isTrainerFound) {
                setUserFound(false);
                console.log("not found");
            }
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