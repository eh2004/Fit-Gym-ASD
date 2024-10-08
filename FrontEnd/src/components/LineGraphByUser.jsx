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
  zoomPlugin
);

const ProgressLineGraphByUser = ({ customer, selectedMuscleGroup }) => {
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
        setLoading(false);
        const formattedData = formatDataForGraph(data, selectedMuscleGroup || null); // Null for overall summary
        setChartData(formattedData); // Set formatted chart data
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [customerId, selectedMuscleGroup]);

  // Helper function to format the workout data for the chart
  const formatDataForGraph = (workouts, muscleGroup) => {
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

      // Filter sets based on the selected muscle group, or show all sets in summary mode
      const filteredSets = muscleGroup
        ? workout.Sets.filter((set) => set.Exercise.muscle_group === muscleGroup)
        : workout.Sets;

      if (filteredSets.length === 0) return; // Skip if no sets match the selected muscle group

      // Collect the total weight for the workout as a data point
      const totalWeight = filteredSets.reduce((sum, set) => {
        const weight = parseFloat(set.weight); // Ensure weight is a valid number
        return sum + (isNaN(weight) ? 0 : weight); // Skip invalid weights
      }, 0);

      const averageWeight = totalWeight / filteredSets.length;

      // Create a data point for this workout with sets information for tooltips
      weightData.push({
        x: workoutDate, // Use the valid Date object
        y: averageWeight, // Average weight for y-axis
        setsInfo: filteredSets.map(
          (set) => `${set.Exercise.exercise_name} x ${set.reps} for ${set.weight || 0}kg`
        ), // Store sets info for tooltips
      });
    });

    console.log('Weight Data:', weightData); // Log the weight data

    // Return the formatted data for the chart
    return {
      datasets: [
        {
          label: muscleGroup ? `${muscleGroup} Workout Progress` : 'Overall Workout Progress',
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
      <h1>{selectedMuscleGroup ? `${selectedMuscleGroup} Workout Progress` : 'Overall Workout Progress'}</h1>

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
