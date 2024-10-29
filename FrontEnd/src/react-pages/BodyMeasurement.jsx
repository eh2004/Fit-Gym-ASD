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

    const customerId = localStorage.getItem('loggedInUser');
    
    if (!customerId) {
      setMessage("Error: Customer ID not found. Please log in.");
      return;
    }

    const measurementData = {
      customer_id: customerId,
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
    <div className="measurement-container">
      <Header />
      <h2 className="measurement-title">Body Measurement</h2>
      
      <button onClick={toggleUnit} className="unit-toggle-button">
        {unit === 'cm' ? 'Switch to Inches' : 'Switch to Centimeters'}
      </button>

      <form onSubmit={handleSubmit} className="measurement-form">
        <label className="measurement-label">Neck:</label>
        <input
          type="number"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          required
          className="measurement-input"
        />

        <label className="measurement-label">Arms:</label>
        <input
          type="number"
          value={arms}
          onChange={(e) => setArms(e.target.value)}
          required
          className="measurement-input"
        />

        <label className="measurement-label">Forearms:</label>
        <input
          type="number"
          value={forearms}
          onChange={(e) => setForearms(e.target.value)}
          required
          className="measurement-input"
        />

        <label className="measurement-label">Chest:</label>
        <input
          type="number"
          value={chest}
          onChange={(e) => setChest(e.target.value)}
          required
          className="measurement-input"
        />

        <label className="measurement-label">Waist:</label>
        <input
          type="number"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          required
          className="measurement-input"
        />

        <label className="measurement-label">Quads:</label>
        <input
          type="number"
          value={quads}
          onChange={(e) => setQuads(e.target.value)}
          required
          className="measurement-input"
        />

        <label className="measurement-label">Calves:</label>
        <input
          type="number"
          value={calves}
          onChange={(e) => setCalves(e.target.value)}
          required
          className="measurement-input"
        />

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {message && <p className="message">{message}</p>}
      <Footer />
    </div>
  );
};

ReactDom.createRoot(document.getElementById('root')).render(<App />);
