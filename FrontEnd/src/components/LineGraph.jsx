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
        text: title, // title being passed through the function
        font: {
          size: 20,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // scrolling across x axis 
        },
        zoom: {
          wheel: {
            enabled: true, // mouse wheel zoom
          },
          pinch: {
            enabled: true, // touch device/track pad zoom
          },
          mode: 'x', 
        },
      },
    },
    scales: {
      x: {
        type: 'time', // Use time scale for the x-axis
        time: {
          unit: 'month', 
          displayFormats: {
            month: 'MMM YYYY', 
          },
        },
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
        },
        ticks: {
          source: 'auto',
          autoSkip: true,
          maxRotation: 0, // make labels straight 
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
            return value + ' kg'; // add 'kg' to y axis 
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
