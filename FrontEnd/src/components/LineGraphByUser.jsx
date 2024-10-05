import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CustomerWorkoutsLineGraph = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

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
        console.log("API Response:", data); // Log the full response to check structure
        setCustomers(data); // Set the data to state
        setLoading(false);
        const formattedData = formatDataForGraph(data);
        setChartData(formattedData); // Set formatted chart data
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Helper function to format the workout data for the chart
  const formatDataForGraph = (customers) => {
    let labels = [];
    let weightData = [];

    customers.forEach((customer) => {
      customer.Workouts.forEach((workout) => {
        const workoutDate = new Date(workout.workout_date); // Ensure workout date is a valid Date object
        labels.push(workoutDate);

        // If there are no sets, skip this workout
        if (workout.Sets.length === 0) {
          console.log(`Workout on ${workoutDate} has no sets. Skipping...`);
          return;
        }

        // Collect the total weight for the workout as a data point
        const totalWeight = workout.Sets.reduce((sum, set) => {
          const weight = parseFloat(set.weight); // Ensure weight is a valid number
          return sum + (isNaN(weight) ? 0 : weight); // Skip invalid weights
        }, 0);

        const averageWeight = totalWeight / workout.Sets.length;

        // Debugging log for weights and averages
        console.log(`Workout Date: ${workoutDate}`);
        console.log(`Total Weight: ${totalWeight}, Set Count: ${workout.Sets.length}, Average Weight: ${averageWeight}`);

        // Create a data point for this workout with sets information for tooltips
        weightData.push({
          x: workoutDate, // Use the valid Date object
          y: averageWeight, // Average weight for y-axis
          setsInfo: workout.Sets.map(
            (set) => `Exercise: ${set.Exercise.exercise_name}, Reps: ${set.reps}, Weight: ${set.weight || 0}kg`
          ), // Store sets info for tooltips
        });
      });
    });

    console.log('Labels:', labels);       // Log the labels
    console.log('Weight Data:', weightData); // Log the weight data

    // Return the formatted data for the chart
    return {
      labels, // x-axis labels (workout dates)
      datasets: [
        {
          label: 'Average Weight (kg)',
          data: weightData,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="line-chart-container">
      <h1>Workout Progress Line Graph</h1>
      {chartData ? (
        <div style={{ height: '400px' }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                    displayFormats: {
                      day: 'MMM DD',
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Average Weight (kg)',
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    // Custom tooltip to show all sets info when hovering
                    label: function (context) {
                      const setsInfo = context.raw.setsInfo;
                      return setsInfo.join('\n'); // Show each set on a new line in tooltip
                    },
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p>No chart data available</p>
      )}
    </div>
  );
};

export default CustomerWorkoutsLineGraph;
