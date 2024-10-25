import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newTime, setNewTime] = useState(null);

  // Get customer_id from localStorage (or however you're managing login state)
  const customer_id = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/bookings/customer/${customer_id}`);
        const data = await response.json();
  
        if (response.ok) {
          console.log('Fetched bookings:', data);
          setBookings(data); // Set the fetched bookings if successful
        } else {
          console.error('Error fetching bookings:', data.error); // Handle the error
          setBookings([]); // Set an empty array to avoid .map() errors
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]); // Set an empty array in case of a fetch error
      }
    };
  
    fetchBookings();
  }, [customer_id]);

  // Function to cancel a booking
  const cancelBooking = async (id) => {
    console.log('Booking ID to cancel:', id); // This should now log the correct booking_id
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.booking_id !== id)); // Filter by booking_id
        alert("Booking cancelled successfully");
      } else {
        alert("Failed to cancel the booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };
  
  

  // Function to reschedule a booking
  const rescheduleBooking = async () => {
    if (selectedBooking) {
      console.log('Booking ID to reschedule:', selectedBooking.booking_id); // Log the correct booking_id
      try {
        const response = await fetch(`http://localhost:3000/api/bookings/${selectedBooking.booking_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_date: newTime.toISOString(),
          }),
        });
  
        if (response.ok) {
          setBookings(
            bookings.map((booking) =>
              booking.booking_id === selectedBooking.booking_id
                ? { ...booking, time: newTime || booking.time }
                : booking
            )
          );
          setSelectedBooking(null); // Close the reschedule modal or hide the datepicker
          setNewTime(null); // Reset the new time
          alert("Booking rescheduled successfully");
        } else {
          alert("Failed to reschedule the booking");
        }
      } catch (error) {
        console.error("Error rescheduling booking:", error);
      }
    }
  };
  
  

  return (
    <div className="booking">
      <h3>Your Bookings:</h3> 
      <table>
        <thead>
          <tr>
            <th>Trainer Name</th>
            <th>Booking Type</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            console.log('Booking ID:', booking.booking_id); // Log the correct field
            return (
              <tr key={booking.booking_id}>
                <td>{booking.trainer_name}</td>
                <td>{booking.booking_type}</td>
                <td>{new Date(booking.booking_date).toLocaleString()}</td>
                <td>
                  <button onClick={() => cancelBooking(booking.booking_id)}>Cancel</button> {/* Use booking.booking_id */}
                  <button onClick={() => {
                    setSelectedBooking(booking);
                    setNewTime(new Date(booking.booking_date)); // Set newTime to current booking time when opening
                  }}>Reschedule</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedBooking && (
        <div className="reschedule-section">
          <h4>Reschedule Booking</h4>
          <DatePicker
            selected={newTime}
            onChange={(date) => setNewTime(date)}
            showTimeSelect
            dateFormat="Pp"
          />
          <button onClick={rescheduleBooking}>Confirm Reschedule</button>
          <button onClick={() => setSelectedBooking(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Booking;