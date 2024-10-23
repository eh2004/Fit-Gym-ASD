import React, { useEffect, useState } from "react";
import UserBookCalendar from "../components/UserBookCalendar.jsx";

// Function to get query parameters from the URL
function useQuery() {
  return new URLSearchParams(window.location.search);  // Parse the query string
}

function Guy1Page() {
  const query = useQuery();  // Get query parameters
  const trainerId = query.get('trainerId');  // Get the 'trainerId' from the URL
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    // Fetch trainer data based on the trainerId
    const fetchTrainer = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/trainers/${trainerId}`);
        const data = await response.json();
        setTrainer(data);
      } catch (error) {
        console.error('Error fetching trainer data:', error);
      }
    };

    if (trainerId) {
      fetchTrainer();
    }
  }, [trainerId]);

  if (!trainer) {
    return <div>Loading...</div>;  // Show a loading state while fetching data
  }

  return (
    <div className="trainer-profile-container">
      <div className="trainer-profile-left">
        {/* Use trainer photo if available, otherwise use a placeholder */}
        <img 
          className="profile-photo" 
          src={trainer.photo_url || '/src/assets/noPFP.jpg'} 
          alt={`${trainer.first_name} ${trainer.last_name}`} 
        />
        <div className="trainer-bio">
          <h2>{trainer.first_name} {trainer.last_name}</h2>
          <p><strong>Age:</strong> {new Date().getFullYear() - new Date(trainer.date_of_birth).getFullYear()}</p>
          <p><strong>Email:</strong> {trainer.email_address}</p>
          <p><strong>Phone:</strong> {trainer.phone_number}</p>
          <p><strong>Preferred Language:</strong> {trainer.language}</p>
          <p><strong>Gender:</strong> {trainer.gender}</p>
        </div>
      </div>
      
      <div className="trainer-profile-middle">
        <p className="trainer-message-box">Hello, I am {trainer.first_name}</p>
        <UserBookCalendar />
      </div>
    </div>
  );
}

export default Guy1Page;
