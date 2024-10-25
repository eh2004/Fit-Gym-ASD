import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/stylebest.css";

function BookHIIT() {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00`;
  });

  const onChange = (date) => {
    setValue(date);
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBooking = async () => {
    const customer_id = localStorage.getItem('loggedInUser');

    if (!customer_id) {
      alert("Customer is not logged in. Please log in to book a session.");
      return;
    }

    const booking_type = "HIIT";
    const trainer_name = "Trainer Mike";

    if (selectedDate && selectedTime) {
      const bookingDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":");
      bookingDate.setHours(hours);
      bookingDate.setMinutes(minutes);

      try {
        const response = await fetch("http://localhost:3000/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id,
            booking_date: bookingDate.toISOString(),
            booking_type,
            trainer_name,
          }),
        });

        const data = await response.text();

        if (response.ok) {
          alert(`Booking confirmed for HIIT on ${bookingDate.toDateString()} at ${selectedTime}`);
        } else {
          alert(`Error creating booking: ${data}`);
        }
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("An error occurred while creating the booking.");
      }
    } else {
      alert("Please select a date and a time.");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="pilates-container">
        <img 
          src="/src/assets/hiit.jpg"
          alt="HIIT" 
          className="pilates-image"
        />
        <p className="pilates-description">
          HIIT (High-Intensity Interval Training) is a fast-paced workout alternating between intense bursts of activity and recovery periods to boost cardiovascular fitness.
        </p>
        <p className="pilates-description">
          ALL CLASSES ARE TAKEN BY TRAINER MIKE
        </p>
      </div>

      <div className="calendar-container">
        <Calendar onChange={onChange} value={value} />

        {selectedDate && (
          <div className="time-slots-container">
            <h4>Available Times on {selectedDate.toDateString()}:</h4>
            <div className="time-slot-list">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`time-slot-button ${selectedTime === slot ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button className="book-button" onClick={handleBooking}>Book HIIT</button>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BookHIIT />);
