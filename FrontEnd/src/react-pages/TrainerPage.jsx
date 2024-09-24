import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Dashboard from "../components/Dashboard.jsx";
import "../css/style.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)