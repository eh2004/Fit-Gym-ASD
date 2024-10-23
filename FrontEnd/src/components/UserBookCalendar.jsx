import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/stylebest.css";

function UserBookCalendar() {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // Add selected time state

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9; // Time slots from 9 AM to 5 PM
    return `${hour}:00`;
  });

  // Function to handle date change
  const onChange = (date) => {
    setValue(date);
    setSelectedDate(date); // Set selected date
    setSelectedTime(null); // Reset selected time when date changes
  };


  
  // Function to handle booking
  const handleBooking = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    if (!loggedInUser) {
      alert('Customer is not logged in. Please log in to book a workout.');
      return;  // Stop the function if no loggedInUser is found in localStorage
    }
  
    const customer_id = loggedInUser.id;  // Extract the 'id' from loggedInUser
  
    if (selectedDate && selectedTime) {
      // Combine the selected date and time
      const workoutDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');  // Assuming selectedTime is in "HH:MM" format
      workoutDate.setHours(hours);
      workoutDate.setMinutes(minutes);
  
      try {
        const response = await fetch('http://localhost:3000/api/workouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: customer_id,  // Use the dynamically retrieved customer_id
            workout_date: workoutDate.toISOString(),  // Use the combined date and time
          }),
        });
  
        const data = await response.text();
  
        if (response.ok) {
          const jsonData = JSON.parse(data);
          alert(`Booking confirmed for ${workoutDate.toDateString()} at ${selectedTime}, please head to your profile to manage this booking`);
        } else {
          const jsonData = JSON.parse(data);
          alert('Error booking workout: ' + (jsonData.error || 'Unexpected error occurred'));
        }
      } catch (error) {
        console.error('Error booking workout:', error);
        alert('An error occurred while booking the workout.');
      }
    } else {
      alert('Please select a date and a time');
    }
  };
  
  



  return (
    <div className="calendar-container">
      <Calendar onChange={onChange} value={value} />
      
      {/* Show time slots when a date is selected */}
      {selectedDate && (
        <div className="time-slots-container">
          <h4>Available Times on {selectedDate.toDateString()}:</h4>
          <div className="time-slot-list">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                className={`time-slot-button ${selectedTime === slot ? 'selected' : ''}`} // Highlight selected slot
                onClick={() => setSelectedTime(slot)} // Set selected time
              >
                {slot}
              </button>
            ))}
          </div>
          <button className="book-button" onClick={handleBooking}>Book</button>
        </div>
      )}
    </div>
  );
}

export default UserBookCalendar;
