import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/stylebest.css"
import TrainerSelect from "../components/TrainerSelect.jsx";

function App() {
    return (
        <React.Fragment>
            <Header />
            <TrainerSelect />
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);