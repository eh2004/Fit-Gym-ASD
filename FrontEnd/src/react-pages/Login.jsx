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

    useEffect(() => {
        fetch('http://localhost:3000/api/customers')
        .then(response => response.json())
        .then(data => setCustomersList(data))
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserFound(false)
        for(let i = 0; i < customersList.length; i++) {
            if(username == customersList[i].username) {
                if(password == customersList[i].password) {
                    console.log("Found!");
                    setUserFound(true);
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

    return (
        <React.Fragment>
        <Header />
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
                   <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={handleFocus}/>
                </div>
            </div>

            <div className="error-msg" style={{ visibility: userFound ? 'hidden' : 'visible' }}>Incorrect username or password.</div>
        </div>
        <input className="submit-button" type="submit" value="Login"></input>
        </form>
        <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)