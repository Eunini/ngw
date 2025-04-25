import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SuccessRateChart = () => {
  // Sample data - replace with your actual data
  const yesData = [12, 19, 15, 22, 18, 14, 17, 20, 16, 13, 21, 10]; // Number of "Yes" per month
  const noData = [8, 5, 10, 3, 7, 11, 8, 5, 9, 12, 4, 15]; // Number of "No" per month

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Yes',
        data: yesData,
        backgroundColor: '#EF4444', // Red
        borderColor: '#DC2626',
        borderWidth: 1
      },
      {
        label: 'No',
        data: noData,
        backgroundColor: '#3B82F6', // Blue
        borderColor: '#2563EB',
        borderWidth: 1
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Yes/No Responses',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
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
          text: 'Number of Responses',
          color: '#666',
          font: {
            weight: 'bold',
            size: 12
          }
        },
        min: 0,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#666',
          stepSize: 5,
          precision: 0
        }
      }
    }
  };

  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SuccessRateChart;