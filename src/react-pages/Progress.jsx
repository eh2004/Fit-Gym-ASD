import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/styling.css"
//soon to be import progress chart 

const App = () =>{
    return (
        <React.Fragment>
            <Header />
                <div>
                    <h1>MmmMmmmMMMMmmmmm progression</h1>
                </div>
            <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);