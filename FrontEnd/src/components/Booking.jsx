import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      trainerName: 'Jane Smith',
      service: 'Personal Training',
      time: new Date('2024-08-28T10:00:00'),
    },
    {
      id: 2,
      customerName: 'Alice Johnson',
      trainerName: 'Jane Smith',
      service: 'Yoga Class',
      time: new Date('2024-08-29T14:00:00'),
    },
    // Add more sample bookings here
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newTime, setNewTime] = useState(null);

  const cancelBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const rescheduleBooking = () => {
    if (selectedBooking) {
      setBookings(
        bookings.map((booking) =>
          booking.id === selectedBooking.id ? { ...booking, time: newTime || booking.time } : booking
        )
      );
      setSelectedBooking(null); // Close the reschedule modal or hide the datepicker
      setNewTime(null); // Reset the new time
    }
  };

  return (
    <div className="booking">
      <h3>Upcoming Bookings</h3>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Trainer Name</th>
            <th>Service</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.customerName}</td>
              <td>{booking.trainerName}</td>
              <td>{booking.service}</td>
              <td>{booking.time.toLocaleString()}</td>
              <td>
                <button onClick={() => cancelBooking(booking.id)}>Cancel</button>
                <button onClick={() => {
                  setSelectedBooking(booking);
                  setNewTime(booking.time); // Set newTime to current booking time when opening
                }}>Reschedule</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBooking && (
        <div className="reschedule-section">
          <h4>Reschedule Booking for {selectedBooking.customerName}</h4>
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