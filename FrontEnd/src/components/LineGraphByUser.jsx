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
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin // Register the zoom plugin here
);

const ProgressLineGraphByUser = ({ customer }) => {
  const customerId = customer.id; // Extract the customer ID from the customer prop
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch workouts for a specific customer from the backend
    fetch(`http://localhost:3000/api/customers/${customerId}/workouts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch customer workouts');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response for customer:', data); // Log the full response to check structure
        setLoading(false);
        const formattedData = formatDataForGraph(data);
        setChartData(formattedData); // Set formatted chart data
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [customerId]);

  // Helper function to format the workout data for the chart
  const formatDataForGraph = (workouts) => {
    let weightData = [];

    // Sort workouts by workout_date in ascending order
    workouts.sort((a, b) => new Date(a.workout_date) - new Date(b.workout_date));

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.workout_date); // Parse workout date as a Date object

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

      // Create a data point for this workout with sets information for tooltips
      weightData.push({
        x: workoutDate, // Use the valid Date object
        y: averageWeight, // Average weight for y-axis
        setsInfo: workout.Sets.map(
          (set) => `${set.Exercise.exercise_name} x ${set.reps} for ${set.weight || 0}kg`
        ), // Store sets info for tooltips
      });
    });

    console.log('Weight Data:', weightData); // Log the weight data

    // Return the formatted data for the chart
    return {
      datasets: [
        {
          label: 'Average Weight (kg)',
          data: weightData, // Use the x (date) and y (average weight)
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
                    tooltipFormat: 'MMM DD, YYYY', // Format for the tooltip
                    displayFormats: {
                      day: 'MMM DD', // Format for the x-axis labels
                    },
                  },
                  ticks: {
                    source: 'data', // Use data points to space ticks
                    autoSkip: true, // Automatically skip ticks if they overlap
                    maxRotation: 0, // Avoid rotating the labels
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
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'x', // Enable panning in the x direction
                  },
                  zoom: {
                    wheel: {
                      enabled: true, // Enable zooming with the mouse wheel
                    },
                    pinch: {
                      enabled: true, // Enable zooming on touch devices
                    },
                    mode: 'x', // Only allow zooming in the x direction
                  },
                },
                tooltip: {
                  callbacks: {
                    // Custom tooltip to show each exercise info on a new line
                    label: function (context) {
                      const setsInfo = context.raw.setsInfo;
                      // Return each set info as a separate line (each array item creates a new line)
                      return setsInfo.map((set) => `${set}`);
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

export default ProgressLineGraphByUser;
