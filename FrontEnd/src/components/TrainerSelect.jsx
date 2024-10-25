import React, { useState, useEffect } from "react";
import "../css/stylebest.css";

function TrainerSelect() {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  // Check if the user is logged in by checking localStorage
  const isLoggedIn = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/trainers');
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        const data = await response.json();
        setTrainers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Function to handle booking redirection
  const handleBooking = (trainerId) => {
    if (isLoggedIn) {
      // Redirect to the trainer's booking page with trainerId in the URL
      window.location.href = `/src/pages/guy1book.html?trainerId=${trainerId}`;
    } else {
      // Redirect to login page if not logged in
      window.location.href = "/src/pages/login.html";
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || trainers.length === 0) {
    return <div>Loading trainers...</div>;
  }

  return (
    <div className="trainer-profile-container">
      <h2>Available Trainers</h2>
      <div className="trainer-list">
        {trainers.map((trainer) => (
          <div className="trainer-card" key={trainer.trainer_id}>
            <img 
              className="profile-photo" 
              src={trainer.photo_url || '/src/assets/noPFP.jpg'} 
              alt={`${trainer.first_name} ${trainer.last_name}`} 
            />
            <div className="trainer-bio">
              <h2>{trainer.first_name} {trainer.last_name}</h2>
              <button 
                className="trainer-book-button" 
                onClick={() => handleBooking(trainer.trainer_id)}
              >
                Book with {trainer.first_name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerSelect;