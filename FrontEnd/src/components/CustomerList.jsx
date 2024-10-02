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
            {customer.first_name} {customer.last_name} - {customer.email_address} - {customer.phone_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
