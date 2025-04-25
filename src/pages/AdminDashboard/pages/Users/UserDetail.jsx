import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRegEnvelope,
  FaIdBadge,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function UserDetails() {
  // Generate random data between 3 and 10 for each month
  const generateRandomData = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 8) + 3);
  };

  const barData = generateRandomData();
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Chart data configuration
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Projects",
        data: barData,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Random user ID for profile picture
  const randomUserId = Math.floor(Math.random() * 1000);

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-500 text-center md:text-left">
        Users / <a href="admin/users/" className="underline">User Details</a>
      </div>

      {/* Main Card */}
      <div className="bg-white p-4 rounded-xl shadow-md w-full mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
          <img
            src={`https://i.pravatar.cc/150?img=${randomUserId}`}
            alt="User Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold">John Anderson</h2>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded inline-block mt-1">
              Hydrogeologist
            </span>
          </div>
        </div>

        {/* Contact Info - Single Column on Mobile */}
        <div className="mt-6 grid grid-cols-1 gap-3 text-gray-700 text-sm">
          <div className="flex justify-center md:justify-start items-center gap-2">
            <FaPhoneAlt className="flex-shrink-0" /> 
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex justify-center md:justify-start items-center gap-2">
            <FaRegEnvelope className="flex-shrink-0" /> 
            <span className="truncate">john.anderson@example.com</span>
          </div>
          <div className="flex justify-center md:justify-start items-center gap-2">
            <FaMapMarkerAlt className="flex-shrink-0" /> 
            <span>Ibadan</span>
          </div>
          <div className="flex justify-center md:justify-start items-center gap-2">
            <span className="font-medium">Local Government:</span>
            <span>Ibadan North East</span>
          </div>
          <div className="flex justify-center md:justify-start items-center gap-2">
            <span className="font-medium">Town:</span>
            <span>Agbowo</span>
          </div>
          <div className="flex justify-center md:justify-start items-center gap-2">
            <FaIdBadge className="flex-shrink-0" /> 
            <span>HG-2023-1234</span>
          </div>
        </div>

        {/* Stats Cards - Single Column on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="bg-green-100 text-green-700 p-4 rounded text-center">
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm">Successful Projects</p>
          </div>
          <div className="bg-red-100 text-red-700 p-4 rounded text-center">
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm">Failed Projects</p>
          </div>
          <div className="bg-blue-100 text-blue-700 p-4 rounded text-center">
            <p className="text-2xl font-bold">48</p>
            <p className="text-sm">Total Projects</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Projects Over Last 12 Months</h3>
          <div className="relative h-64 max-w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}