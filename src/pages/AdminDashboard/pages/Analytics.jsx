import React from 'react';
import { FaChartBar, FaWater, FaFileAlt, FaTools, FaUsers, FaTachometerAlt, FaMapMarkedAlt, FaChevronRight } from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const Analytics = () => {
  const doughnutData = {
    labels: ['Completed', 'Ongoing', 'Pending'],
    datasets: [
      {
        data: [2, 2, 1],
        backgroundColor: ['#22c55e', '#3b82f6', '#facc15'],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Analytics',
        data: [10, 15, 20, 24, 22, 23],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Project Completion Times',
        data: [20, 25, 18, 28, 26, 30],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.4,
      },
    ],
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col justify-start mb-6 p-3">
        <h1 className="text-xl md:text-2xl font-semibold md:font-bold">Analytics Dashboard</h1>
        <p className='text-sm text-gray-700'>Comprehensive view of all water projects</p>
      </div>

        
        <div className="bg-white space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-2 rounded">
                <div className="text-md md:text-xl font-semibold">Total Projects</div>
                <div className='flex p-1 md:p-3  justify-baseline'>
                    <h1 className='text-xl md:text-2xl font-semibold md:font-bold'>886</h1> 
                    <span className='text-green-500 text-xs p-1 md:p-3'>+18%</span>
                </div>
            </div>
            <div className="p-2 rounded">
                <div className="text-md md:text-xl font-semibold">Success Rate</div>
                <div className='flex p-1 md:p-3 justify-baseline'>
                    <h1 className='text-xl md:text-2xl font-semibold md:font-bold'>78%</h1> 
                    <span className='text-green-500 text-xs p-1 md:p-3'>+22%</span>
                </div>
            </div>
            <div className="p-2 rounded">
                <div className="text-md md:text-xl font-semibold">Active projects</div>
                <div className='flex p-1 md:p-3 justify-baseline'>
                    <h1 className='text-xl md:text-2xl font-semibold md:font-bold'>886</h1> 
                    <span className='text-green-500 text-xs p-1 md:p-3'>+12%</span>
                </div>
            </div>
            
          </div>
        </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-md shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Powered by Status</h2>
          <div className="h-64"> {/* Fixed height container */}
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white rounded-md shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Project Completion Time</h2>
          <div className="h-64"> 
            <Bar 
                data={barData} 
                options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                    display: false // Hide legend if not needed
                    }
                }
                }} 
            />
            </div>
        </div>

        <div className="bg-white rounded-md shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Team Performance</h2>
          <div className="h-64"> 
            <Bar 
                data={barData} 
                options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                    display: false // Hide legend if not needed
                    }
                }
                }} 
            />
            </div>
        </div>

        <div className="bg-white rounded-md shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Average Discharge Rate</h2>
          <div className="h-64"> {/* Fixed height container */}
            <Line 
                data={lineData} 
                options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                    display: false // Hide legend if not needed
                    }
                }
                }} 
            />
            </div>
        </div>
      </div>
      <div className="h-64 w-full rounded overflow-hidden mt-6">
            <iframe
              title="Map"
              className="w-full h-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.0,4.0,14.0,14.0&layer=mapnik"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
    </div>
  );
};

export default Analytics;