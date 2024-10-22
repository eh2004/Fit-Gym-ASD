import React, { useState } from 'react';
import ReactDom from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/styling.css";

const App = () => {
  const [measurements, setMeasurements] = useState({
    neck: '',
    arms: '',
    forearms: '',
    chest: '',
    waist: '',
    quads: '',
    calves: ''
  });

  const [unit, setUnit] = useState('cm');

  const handleChange = (e) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value
    });
  };

  const toggleUnit = () => {
    setUnit(unit === 'cm' ? 'inches' : 'cm');
  };

  const applyChanges = () => {
    console.log('Changes applied:', measurements, 'Unit:', unit);
    // Logic for applying changes and storing them
  };

  const discardChanges = () => {
    setMeasurements({
      neck: '',
      arms: '',
      forearms: '',
      chest: '',
      waist: '',
      quads: '',
      calves: ''
    });
  };

  return (
    <div className="app-container">  {/* Wrapper around everything */}
      <Header />  {/* Header component inside the wrapper */}
      <div className="body-measurement-container">  {/* Centered content */}
        <h2>Edit Your Measurements</h2>
        <div className="measurement-unit-toggle">
          <span>Units: </span>
          <button onClick={toggleUnit}>
            {unit === 'cm' ? 'Centimeters' : 'Inches'}
          </button>
        </div>

        <div className="measurements-inputs">
          <label>Neck ({unit})</label>
          <input type="number" name="neck" value={measurements.neck} onChange={handleChange} />
          
          <label>Arms ({unit})</label>
          <input type="number" name="arms" value={measurements.arms} onChange={handleChange} />
          
          <label>Forearms ({unit})</label>
          <input type="number" name="forearms" value={measurements.forearms} onChange={handleChange} />
          
          <label>Chest ({unit})</label>
          <input type="number" name="chest" value={measurements.chest} onChange={handleChange} />
          
          <label>Waist ({unit})</label>
          <input type="number" name="waist" value={measurements.waist} onChange={handleChange} />
          
          <label>Quads ({unit})</label>
          <input type="number" name="quads" value={measurements.quads} onChange={handleChange} />
          
          <label>Calves ({unit})</label>
          <input type="number" name="calves" value={measurements.calves} onChange={handleChange} />
        </div>

        <div className="measurement-buttons">
          <button onClick={discardChanges}>Discard changes</button>
          <button onClick={applyChanges}>Apply changes</button>
        </div>
      </div>
      <Footer />  {/* Footer component inside the wrapper */}
    </div>
  );
};

export default App;

ReactDom.createRoot(document.getElementById("root")).render(<App />);