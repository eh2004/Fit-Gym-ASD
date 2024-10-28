import React, { useState } from 'react';
import ReactDom from 'react-dom/client';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/styling.css";

const App = () => {
  const [unit, setUnit] = useState('cm');
  const [neck, setNeck] = useState('');
  const [arms, setArms] = useState('');
  const [forearms, setForearms] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [quads, setQuads] = useState('');
  const [calves, setCalves] = useState('');
  const [message, setMessage] = useState('');

  const toggleUnit = () => {
    setUnit(unit === 'cm' ? 'inches' : 'cm');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve customer_id from localStorage
    const customerId = localStorage.getItem('loggedInUser');
    
    if (!customerId) {
      setMessage("Error: Customer ID not found. Please log in.");
      return;
    }

    const measurementData = {
      customer_id: customerId,  // Include customer_id in the data being sent
      neck: parseFloat(neck),
      arms: parseFloat(arms),
      forearms: parseFloat(forearms),
      chest: parseFloat(chest),
      waist: parseFloat(waist),
      quads: parseFloat(quads),
      calves: parseFloat(calves),
    };

    try {
      const response = await fetch('http://localhost:3000/api/measurements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurementData),
      });

      if (response.ok) {
        setMessage('Measurements saved successfully!');
      } else {
        const result = await response.json();
        setMessage(`Failed to save measurements: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      
    }
  };

  return (
    <div>
      <Header />
      <h2>Body Measurement</h2>
      <button onClick={toggleUnit}>
        {unit === 'cm' ? 'Switch to Inches' : 'Switch to Centimeters'}
      </button>

      <form onSubmit={handleSubmit}>
        <label>Neck:</label>
        <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} required />

        <label>Arms:</label>
        <input type="number" value={arms} onChange={(e) => setArms(e.target.value)} required />

        <label>Forearms:</label>
        <input type="number" value={forearms} onChange={(e) => setForearms(e.target.value)} required />

        <label>Chest:</label>
        <input type="number" value={chest} onChange={(e) => setChest(e.target.value)} required />

        <label>Waist:</label>
        <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} required />

        <label>Quads:</label>
        <input type="number" value={quads} onChange={(e) => setQuads(e.target.value)} required />

        <label>Calves:</label>
        <input type="number" value={calves} onChange={(e) => setCalves(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
      <Footer />
    </div>
  );
};

ReactDom.createRoot(document.getElementById('root')).render(<App />);