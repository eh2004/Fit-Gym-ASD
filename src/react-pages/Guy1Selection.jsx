import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/stylebest.css"
import Guy1Page from "../components/Guy1Page.jsx";

function App() {
    return (
        <React.Fragment>
            <Header />
                <Guy1Page />
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);