import React from 'react';
import "../css/styling.css"
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
} from 'chart.js';


// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UpperLineGraph = () => {
  //data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oct', 'Sep','Nov','Dec'],
    datasets: [
      {
        label: 'Bench',
        data: [80, 85, 85, 85, 90, 90, 95, 90, 100, 90, 85, 90],
        fill: false,
        borderColor: 'rgb(255, 173, 173)',
        tension: 0.1,
      },
      {
        label: 'Tricep Extensions',
        data: [60,60,65,65,67,68,70,75,70,60,65,65],
        fill: false,
        borderColor: 'rgb(255, 214, 165)',
        tension: 0.1,
      },
      {
        label: 'Peckdeck',
        data: [60, 50, 50, 50, 60, 55, 70, 80 ,60,70, 60, 40],
        fill: false,
        borderColor: 'rgb(253, 255, 182)',
        tension: 0.1,
      },
      {
        label: 'Chestpress',
        data: [40,45,45,50,40,46,44,40,45,50,30,35],
        fill: false,
        borderColor: 'rgb(202, 255, 191)',
        tension: 0.1,
      },
      {
        label: 'Incline Bench',
        data: [20,20,25,30,30,25,30,30,35,35,40,40],
        fill: false,
        borderColor: 'rgb(189, 178, 255)',
        tension: 0.1,
      },
      {
        label: 'Smith Machine',
        data: [50,50,55,60,62,60,65,70,55,60,60,40],
        fill: false,
        borderColor: 'rgb(255, 198, 255)',
        tension: 0.1,
      },
    ],
  };

  // Config
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Upper Body',
        font: {
            size: 20,// size of title 
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true, // Show grid lines for x-axis
          color: "rgba(200, 200, 200, 0.3)", // Adjust color for visibility
        },
        ticks: {
          font: {
            size: 14, // Font size of the x-axis labels
          },
        },
      },
      y: {
        grid: {
          display: true, // Show grid lines for y-axis
          color: "rgba(200, 200, 200, 0.3)", // Adjust color for visibility
        },
        ticks: {
          font: {
            size: 10, // Y Axis font size 
          },
        },
      },
    },
  };

  return (
    <div className="line-graph-container">
      <Line data={data} options={options} />
    </div>
  )
};

export default UpperLineGraph;