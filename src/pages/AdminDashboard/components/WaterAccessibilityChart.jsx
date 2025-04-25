import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WaterAccessibilityChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Water Accessibility Rate (%)',
        data: [15, 40, 75, 80, 85, 74, 78, 82, 88, 90, 92, 34],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          color: '#666',
          font: {
            weight: 'bold',
            size: 12
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#666'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Percentage',
          color: '#666',
          font: {
            weight: 'bold',
            size: 12
          }
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25, 
          color: '#666',
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        border: {
          display: true,
          color: '#666',
          width: 1
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default WaterAccessibilityChart;