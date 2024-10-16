import React, { useState, useEffect } from 'react';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch customers from the backend
    fetch('http://localhost:3000/api/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);  // Set the data to state
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer.customer_id}>
            <p>
              {customer.first_name} {customer.last_name} - {customer.email_address} - {customer.phone_number}
            </p>

            {customer.Workouts && customer.Workouts.length > 0 && (
              <div>
                <h3>Workouts:</h3>
                <ul>
                  {customer.Workouts.map(workout => (
                    <li key={workout.workout_id}>
                      Date: {new Date(workout.workout_date).toLocaleDateString() || 'Invalid Date'} <br />
                      <h4>Sets:</h4>
                      {workout.Sets && workout.Sets.length > 0 ? (
                        <ul>
                          {workout.Sets.map(set => (
                            <li key={set.set_id}>
                              Exercise: {set.Exercise ? set.Exercise.exercise_name : 'No Exercise'} <br />
                              Reps: {set.reps}, Weight: {set.weight} kg
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No sets available for this workout</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
