import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import './WorkingTime.css'; // Custom styles to override default calendar styling

function WorkingTime() {
  const [value, setValue] = useState(new Date());
  const [availability, setAvailability] = useState({}); // Object to store availability

  const onChange = (date) => {
    setValue(date);
  };

  const onDayClick = (date) => {
    const dateString = date.toDateString();
    const existingTimeSlots = availability[dateString] ? availability[dateString].join(', ') : '';
    
    let message = 'Enter available time slots (comma separated, e.g., "10:00 AM, 1:00 PM")';
    if (existingTimeSlots) {
      message += `\nCurrent time slots: ${existingTimeSlots}\nTo delete availability, leave the input empty and press OK.`;
    }

    const timeSlots = prompt(message, existingTimeSlots);

    // Check for null to differentiate between cancel and empty input
    if (timeSlots !== null) {
        if (timeSlots.trim() === '') {
          // If the input is empty, delete the availability
          setAvailability(prevAvailability => {
            const newAvailability = { ...prevAvailability };
            delete newAvailability[dateString];
            return newAvailability;
          });
        } else {
          // Otherwise, update or add the availability
          // Toggle availability for the clicked date
          setAvailability(prevAvailability => ({
            ...prevAvailability,
            [dateString]: timeSlots.split(',').map(slot => slot.trim())
          }));
        }
      }
    };

    return (
        <div className="working-time">
          <h3>Working Time</h3>
          <Calendar
            onChange={onChange}
            value={value}
            onClickDay={onDayClick} // Attach the onDayClick function here
            tileClassName={({ date, view }) => {
              const dateString = date.toDateString();
              if (view === 'month' && availability[dateString]) {
                return 'available'; // Apply the 'available' class if the date is marked as available
              }
              if (view === 'month' && (date.getDay() === 0 || date.getDay() === 6)) {
                return 'highlight'; // Highlight weekends or non-working days
              }
            }}
            tileContent={({ date, view }) => {
              const dateString = date.toDateString();
              if (view === 'month' && availability[dateString]) {
                return (
                  <ul className="time-slots">
                    {availability[dateString].map((slot, index) => (
                      <li key={index}>{slot}</li>
                    ))}
                  </ul>
                );
              }
            }}
          />
        </div>
      );
    }

export default WorkingTime;