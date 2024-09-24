import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/stylebest.css";

function UserBookCalendar() {
  const [value, setValue] = useState(new Date());
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9; // 9 AM to 5 PM
    return `${hour}:00`;
  });

  const onChange = (date) => {
    setValue(date);
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          const dateString = date.toDateString();
          if (view === 'month' && availability[dateString]) {
            return 'available';
          }
          if (view === 'month' && (date.getDay() === 0 || date.getDay() === 6)) {
            return 'highlight';
          }
        }}
      />
      {selectedDate && (
        <div className="time-slots-container">
          <h4>Available Times on {selectedDate.toDateString()}:</h4>
          <div className="time-slot-list">
            {timeSlots.map((slot, index) => {
              const isAvailable = availability[selectedDate.toDateString()]?.includes(slot);
              return (
                <button
                  key={index}
                  className={`time-slot-button ${isAvailable ? 'available' : 'unavailable'}`}
                  disabled={!isAvailable}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBookCalendar;