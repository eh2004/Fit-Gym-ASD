import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/styling.css"
import LegsLineGraph from "../components/LegsProgress";
import UpperLineGraph from "../components/UpperProgress";
//soon to be import progress chart 

const App = () =>{
    return (
        <React.Fragment>
            <Header />
                <div>
                    <h1>Personal Progress</h1>
                </div>
                <div className="graphs-container">
                    <LegsLineGraph />
                    <UpperLineGraph />
                </div>
                
            <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);