import React from 'react';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx';
import Dashboard from '../components/Dashboard.jsx';
// import Customer from './components/Customer';
import '../css/style.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Dashboard />
      {/* <Customer /> */}
      <Footer />
    </div>
  );
}

export default App;