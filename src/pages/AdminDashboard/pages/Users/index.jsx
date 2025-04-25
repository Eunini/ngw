/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { FaEye, FaTrash } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

import nigeriaData from "../../components/data/nigeriaData.json";

// Extract state names from the JSON data
const stateNames = nigeriaData.states.map(state => state.name);

// Professional types we want to track (5 types)
const professionalTypes = [
  'Hydrogeologist',
  'Civil Engineer',
  'Drilling',
  'Contractor',
  'Drilling Company'
];

// Fixed monthly data for each professional type by state
const getStateMonthlyData = (state) => {
  // Create a base pattern that will be modified slightly per state
  const stateIndex = stateNames.indexOf(state);
  
  return {
    hydrogeologist: [4,7,10,12,11,8,5,13,23,15,18,20].map(val => val + stateIndex * 2),
    engineer: [10,2,19,22,1,3,6,10,13,5,8,16].map(val => val + stateIndex),
    drilling: [8,7,9,20,11,21,4,9,11,10,13,26].map(val => val + stateIndex * 3),
    contractor: [5,12,8,15,7,14,9,16,11,18,13,20].map(val => val + stateIndex),
    company: [3,6,9,12,5,8,11,14,7,10,13,16].map(val => val + stateIndex * 2)
  };
};

const dummyUsers = Array.from({ length: 25 }).map((_, index) => {
  const randomStateIndex = index % stateNames.length;
  const state = stateNames[randomStateIndex];
  const stateData = nigeriaData.states.find(s => s.name === state);
  const lgas = stateData?.lgas || [];
  const randomLgaIndex = index % (lgas.length || 1);
  const lga = lgas[randomLgaIndex] || 'Not specified';
  
  // Include all professional types in the dummy data
  const role = professionalTypes[index % professionalTypes.length];
  
  return {
    id: index + 1,
    name: `User ${index + 1}`,
    phone: `+234 80${Math.floor(Math.random() * 100000000)}`,
    email: `user${index + 1}@example.com`,
    state: state,
    lga: lga,
    role: role,
  };
});

export default function Users() {
  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState('');
  const [tableStateFilter, setTableStateFilter] = useState('All');
  const [tableLgaFilter, setTableLgaFilter] = useState('All');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [availableLgas, setAvailableLgas] = useState(['All']);
  const [lineChartStateFilter, setLineChartStateFilter] = useState(stateNames[0]);
  const [doughnutChartStateFilter, setDoughnutChartStateFilter] = useState(stateNames[0]);
  const navigate = useNavigate();

  // Get all state names
  const allStates = ['All', ...stateNames];

  // Update available LGAs when table state changes
  useEffect(() => {
    if (tableStateFilter === 'All') {
      setAvailableLgas(['All']);
      setTableLgaFilter('All');
    } else {
      const selectedState = nigeriaData.states.find(s => s.name === tableStateFilter);
      const lgas = selectedState ? ['All', ...selectedState.lgas] : ['All'];
      setAvailableLgas(lgas);
      setTableLgaFilter('All');
    }
  }, [tableStateFilter]);

  // Filter users for the table only
  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (tableStateFilter === 'All' || user.state === tableStateFilter) &&
      (tableLgaFilter === 'All' || user.lga === tableLgaFilter)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleDelete = id => setUsers(users.filter(user => user.id !== id));

  // // Count all users by professional type (not affected by table filters)
  // const professionalCounts = professionalTypes.reduce((acc, type) => {
  //   acc[type] = users.filter(user => user.role === type).length;
  //   return acc;
  // }, {});

  // Count users for doughnut chart state filter
  const doughnutChartStateCounts = professionalTypes.reduce((acc, type) => {
    acc[type] = users.filter(user => user.state === doughnutChartStateFilter && user.role === type).length;
    return acc;
  }, {});

  // Line chart data (filtered by lineChartStateFilter)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Hydrogeologists',
        data: getStateMonthlyData(lineChartStateFilter).hydrogeologist,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Civil Engineers',
        data: getStateMonthlyData(lineChartStateFilter).engineer,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Drilling',
        data: getStateMonthlyData(lineChartStateFilter).drilling,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Contractors',
        data: getStateMonthlyData(lineChartStateFilter).contractor,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Drilling Companies',
        data: getStateMonthlyData(lineChartStateFilter).company,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // State distribution chart data (filtered by doughnutChartStateFilter)
  const stateDistributionData = {
    labels: professionalTypes,
    datasets: [{
      label: 'Users',
      data: professionalTypes.map(type => doughnutChartStateCounts[type]),
      backgroundColor: [
        'rgba(79, 70, 229, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(245, 158, 11, 0.7)'
      ],
      borderColor: [
        'rgba(79, 70, 229, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(245, 158, 11, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">Dashboard / Users</p>

      {/* Charts & Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Line Chart - Shows monthly trends for all professional types */}
        <div className="bg-white shadow p-3 sm:p-4 rounded lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-base sm:text-lg">
              Monthly User Trends for {lineChartStateFilter}
            </h2>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={lineChartStateFilter}
              onChange={(e) => setLineChartStateFilter(e.target.value)}
            >
              {stateNames.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="h-64 sm:h-80">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        {/* Doughnut and Summary - Stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="bg-white shadow p-3 sm:p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-base sm:text-lg">
                Professional Distribution in {doughnutChartStateFilter}
              </h2>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={doughnutChartStateFilter}
                onChange={(e) => setDoughnutChartStateFilter(e.target.value)}
              >
                {stateNames.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="h-48 sm:h-64">
              <Doughnut
                data={stateDistributionData}
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white shadow p-4 sm:p-5 rounded flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Total Users</h1>
            <p className="text-3xl sm:text-4xl text-[#2563EB] font-bold py-3 sm:py-4">{users.length}</p>
            <p className="text-sm sm:text-base text-gray-500">Active users in system</p>
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white shadow rounded p-3 sm:p-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded px-3 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <select
            className="border rounded px-3 py-2 w-full"
            value={tableStateFilter}
            onChange={e => setTableStateFilter(e.target.value)}
          >
            {allStates.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2 w-full"
            value={tableLgaFilter}
            onChange={e => setTableLgaFilter(e.target.value)}
            disabled={tableStateFilter === 'All'}
          >
            {availableLgas.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2 w-full"
            value={rowsPerPage}
            onChange={e => setRowsPerPage(Number(e.target.value))}
          >
            {[10, 20, 25, 50].map(n => (
              <option key={n} value={n}>Show {n}</option>
            ))}
          </select>
        </div>

        {/* Table remains the same */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Phone</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Email</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">State</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">LGA</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Role</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.state}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.lga}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-3">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => navigate(`/admin/users/${user.id}`)}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDelete(user.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-4 text-center text-sm text-gray-500">
                        No users found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="text-sm text-gray-500">
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
            </div>
            <div className="flex gap-1">
              <button
                disabled={page === 1}
                className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded-md text-sm font-medium ${
                    page === i + 1 ? 'bg-blue-500 text-white border-blue-500' : ''
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}