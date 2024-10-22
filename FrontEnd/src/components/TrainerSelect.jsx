import React, { useState, useEffect } from "react";
import "../css/stylebest.css";

function TrainerSelect() {
  const [trainers, setTrainers] = useState([]); // To store the fetched trainers
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    // Basic fetch call to retrieve trainers
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/trainers'); // Fetch from your backend
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        const data = await response.json(); // Parse the JSON response
        setTrainers(data); // Set the trainers in state
      } catch (err) {
        setError(err.message); // Catch and set errors if any
      }
    };

    fetchTrainers(); // Call the fetch function
  }, []); // Empty dependency array to run only once on component mount

  // If there's an error, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If the trainers array is empty, show a loading message
  if (trainers.length === 0) {
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
              src={trainer.photo_url || '/src/assets/noPFP.jpg'}  // Replace with your actual placeholder path
              alt={`${trainer.first_name} ${trainer.last_name}`}
            />
            <div className="trainer-bio">
              <h2>{trainer.first_name} {trainer.last_name}</h2>
              <button className="trainer-book-button">Book with {trainer.first_name}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerSelect;


// import React from "react";



// function TrainerSelect() {
//   const [trainers, setTrainers] = useState([]);

//   useEffect(() => {
//     const fetchTrainers = async () => {
//       try {
//         const response = await fetch('/api/trainers');
//         const data = await response.json();
//         setTrainers(data);
//       } catch (error) {
//         console.error("Error fetching trainers:", error);
//       }
//     };
//     fetchTrainers();
//   }, []);

//   return (
//     <div>
//       <p className="hometext">Who would you like to book with?</p>

//       <div className="trainer-container">
//         {trainers.map((trainer) => (
//           <div className="trainer-card" key={trainer.trainer_id}>
//             <img src={`/assets/${trainer.username}.jpg`} alt={`Trainer ${trainer.first_name}`} />
//             <h2>{trainer.first_name} {trainer.last_name}</h2>
//             <p>{trainer.bio}</p> 
//             <a href={`${trainer.username}Book.html`} className="button-link">
//               Select {trainer.first_name}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TrainerSelect;