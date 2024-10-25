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

  const getTrainerIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('trainerId');  // This will return the trainerId from the URL
  };

  // Function to handle booking
  const handleBooking = async () => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      alert('Customer is not logged in. Please log in to book a session.');
      return;  // Stop the function if no loggedInUser is found in localStorage
    }

    const customer_id = loggedInUser;  // Extract the 'id' from loggedInUser
    const trainer_id = getTrainerIdFromUrl();  // Get the trainer ID from the URL
    const booking_type = 'PT Session';  // Set the booking type

    if (selectedDate && selectedTime) {
      // Combine the selected date and time
      const bookingDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');  // Assuming selectedTime is in "HH:MM" format
      bookingDate.setHours(hours);
      bookingDate.setMinutes(minutes);

      try {
        const response = await fetch('http://localhost:3000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: customer_id,  // Use the dynamically retrieved customer_id
            booking_date: bookingDate.toISOString(),  // Use the combined date and time
            booking_type: booking_type,  // Pass the booking type
            trainer_id: trainer_id,  // Pass the trainer's ID dynamically from the URL
          }),
        });

        const data = await response.text();

        if (response.ok) {
          alert(`Booking confirmed for ${bookingDate.toDateString()} at ${selectedTime}`);
        } else {
          alert('Error creating booking: ' + (JSON.parse(data).error || 'Unexpected error occurred'));
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        alert('An error occurred while creating the booking.');
      }
    } else {
      alert('Please select a date and a time');
    }
  };

  return (
    <div className="calendar-container">
      <Calendar 
        onChange={onChange} 
        value={value} 
        
        />

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
