import React from 'react';
import "../css/styling.css";
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
  TimeScale
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-moment';

// Register components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // Register the TimeScale for time-based x-axis
  zoomPlugin // Register the zoom plugin
);

const ProgressLineGraph = ({ title, data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title, // Use the title passed as a prop
        font: {
          size: 20,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // Enable panning along the X-axis
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
          pinch: {
            enabled: true, // Enable zooming on touch devices
          },
          mode: 'x', // Zoom along the X-axis
        },
      },
    },
    scales: {
      x: {
        type: 'time', // Use time scale for the x-axis
        time: {
          unit: 'month', // Display in months
          displayFormats: {
            month: 'MMM YYYY', // Show month and year
          },
        },
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
        },
        ticks: {
          source: 'auto',
          autoSkip: true, // Skip some ticks to prevent clutter when zoomed out
          maxRotation: 0, // Keep labels horizontal
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
        },
        ticks: {
          font: {
            size: 10,
          },
          callback: function(value) {
            return value + ' kg'; // Format y-axis values with 'kg'
          },
        },
        title: {
          display: true,
          text: 'Weight (kg)', // Label for y-axis
        },
      },
    },
  };

  return (
    <div className="line-graph-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressLineGraph;
