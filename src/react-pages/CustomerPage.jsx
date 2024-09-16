import React from "react";
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CustomerDashboard from "../components/CustomerDashboard.jsx";
import "../css/style.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <CustomerDashboard />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);