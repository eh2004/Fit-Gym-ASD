import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/stylebest.css";

function BookPilates() {
    const [value, setValue] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const timeSlots = Array.from({ length: 9 }, (_, i) => {
        const hour = i + 9; // Time slots from 9 AM to 5 PM
        return `${hour}:00`;
    });

    const onChange = (date) => {
        setValue(date);
        setSelectedDate(date);
        setSelectedTime(null); // Reset selected time when date changes
    };

    const handleBooking = async () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser) {
            alert("Customer is not logged in. Please log in to book a session.");
            return;
        }

        const customer_id = loggedInUser.id;
        const booking_type = "Pilates";

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
                        customer_id: customer_id,
                        booking_date: bookingDate.toISOString(),
                        booking_type: booking_type,
                        trainer_name: null, // No specific trainer for Pilates
                    }),
                });

                const data = await response.text();

                if (response.ok) {
                    alert(`Booking confirmed for Pilates on ${bookingDate.toDateString()} at ${selectedTime}`);
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
                    src="/src/assets/pilates.jpg"
                    alt="Pilates" 
                    className="pilates-image"
                />
                <p className="pilates-description">
                    Pilates is a form of low-impact exercise that aims to strengthen muscles while improving postural alignment and flexibility. It's perfect for enhancing core stability.
                </p>
            </div>

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
                                    className={`time-slot-button ${selectedTime === slot ? 'selected' : ''}`}
                                    onClick={() => setSelectedTime(slot)}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                        <button className="book-button" onClick={handleBooking}>Book Pilates</button>
                    </div>
                )}
            </div>

            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BookPilates />);
