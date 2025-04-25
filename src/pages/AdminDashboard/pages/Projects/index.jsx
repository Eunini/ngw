/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FiFilter, FiDownload } from "react-icons/fi";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import nigeriaData from "../../components/data/nigeriaData.json";
import stateMonthlyData from "../../components/data/stateMonthlyData.json";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function ProjectsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [lgaFilter, setLgaFilter] = useState("All LGAs");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [availableLgas, setAvailableLgas] = useState(["All LGAs"]);
  const [chart1State, setChart1State] = useState("Lagos"); // Default to Lagos for bar chart
  const [chart2State, setChart2State] = useState("Lagos"); // Default to Lagos for line chart

  const [projects, setProjects] = useState([
    {
      id: "PRJ001",
      name: "Road Construction Phase 1",
      consultant: "John Smith",
      start: "2023-01-15",
      finish: "2023-01-28",
      state: "Lagos",
      lga: "Ikeja",
      status: "Completed",
      successful: "Yes",
    },
    {
      id: "PRJ002",
      name: "Bridge Renovation",
      consultant: "Sarah Johnson",
      start: "2023-03-01",
      finish: "2023-02-28",
      state: "Abuja",
      lga: "Gwagwalada",
      status: "Ongoing",
      successful: "N/A",
    },
    ...Array.from({ length: 18 }).map((_, i) => {
      const states = ["Lagos", "Abuja", "Rivers", "Kano", "Oyo"];
      const state = states[i % 5];
      const stateData = nigeriaData.states.find(s => s.name === state);
      const lgas = stateData?.lgas || [];
      const lga = lgas[i % lgas.length] || "Central";

      return {
        id: `PRJ${100 + i}`,
        name: `Project ${i + 1}`,
        consultant: `Consultant ${i + 1}`,
        start: `2023-${(i % 12) + 1}-${(i % 28) + 1}`,
        finish: `2023-${((i + 3) % 12) + 1}-${((i + 5) % 28) + 1}`,
        state: state,
        lga: lga,
        status: i % 3 === 0 ? "Completed" : "Ongoing",
        successful: i % 3 === 0 ? "Yes" : i % 3 === 1 ? "No" : "N/A",
      };
    })
  ]);

  const allStates = ["All States", ...nigeriaData.states.map(state => state.name)];
  const statusOptions = ["All Status", "Completed", "Ongoing"];
  const rowsOptions = [10, 20, 30, 50];

  useEffect(() => {
    if (stateFilter === "All States") {
      setAvailableLgas(["All LGAs"]);
      setLgaFilter("All LGAs");
    } else {
      const selectedState = nigeriaData.states.find(s => s.name === stateFilter);
      const lgas = selectedState ? ["All LGAs", ...selectedState.lgas] : ["All LGAs"];
      setAvailableLgas(lgas);
      setLgaFilter("All LGAs");
    }
  }, [stateFilter]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.consultant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = stateFilter === "All States" || project.state === stateFilter;
    const matchesLga = lgaFilter === "All LGAs" || project.lga === lgaFilter;
    const matchesStatus = statusFilter === "All Status" || project.status === statusFilter;

    return matchesSearch && matchesState && matchesLga && matchesStatus;
  });

  // Generate bar chart data for selected state (now monthly like line chart)
  const generateBarChartData = (state) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const stateData = stateMonthlyData[state] || stateMonthlyData["Lagos"];

    return {
      labels: months,
      datasets: [
        {
          label: "Completed Projects",
          data: stateData.completed,
          backgroundColor: "#10B981",
          borderRadius: 4,
        },
        {
          label: "Ongoing Projects",
          data: stateData.ongoing,
          backgroundColor: "#F59E0B",
          borderRadius: 4,
        },
      ],
    };
  };

  // Generate line chart data for selected state
  const generateLineChartData = (state) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const stateData = stateMonthlyData[state] || stateMonthlyData["Lagos"];

    return {
      labels: months,
      datasets: [
        {
          label: "Completed Projects",
          data: stateData.completed,
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Ongoing Projects",
          data: stateData.ongoing,
          borderColor: "#F59E0B",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  };

  const barChartData = generateBarChartData(chart1State);
  const lineChartData = generateLineChartData(chart2State);

  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
// Function to export data to CSV
const exportToCSV = () => {
  // Prepare CSV content
  const headers = [
    "ID",
    "Project Name",
    "Consultant",
    "Start Date",
    "Finish Date",
    "State",
    "LGA",
    "Status",
    "Successful"
  ].join(',');

  const csvRows = filteredProjects.map(project => {
    return [
      `"${project.id}"`,
      `"${project.name}"`,
      `"${project.consultant}"`,
      `"${project.start}"`,
      `"${project.finish}"`,
      `"${project.state}"`,
      `"${project.lga}"`,
      `"${project.status}"`,
      `"${project.successful}"`
    ].join(',');
  });

  const csvContent = [headers, ...csvRows].join('\n');

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `projects_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 w-full">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-semibold">Projects Dashboard</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Projects", value: projects.length },
          { label: "Completed Projects", value: projects.filter(p => p.status === "Completed").length },
          { label: "Ongoing Projects", value: projects.filter(p => p.status === "Ongoing").length },
          { label: "Success Rate", 
            value: `${Math.round(
              (projects.filter(p => p.successful === "Yes").length / 
              projects.filter(p => p.successful !== "N/A").length * 100
            ))}%` 
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Bar Chart - Monthly Project Status */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Project Status by State</h2>
            <select
              className="border rounded px-3 py-1 text-sm"
              value={chart1State}
              onChange={(e) => setChart1State(e.target.value)}
            >
              <option value="All">All States</option>
              {nigeriaData.states.map(state => (
                <option key={state.name} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="relative h-72">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Line Chart - Monthly Progress Overview */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Project Distribution by State</h2>
            <select
              className="border rounded px-3 py-1 text-sm"
              value={chart2State}
              onChange={(e) => setChart2State(e.target.value)}
            >
              <option value="All">All States</option>
              {nigeriaData.states.map(state => (
                <option key={state.name} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="relative h-72">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="grid grid-cols-2 md:flex gap-4 w-full md:w-auto">
          <select
            className="border-0 outline-0 bg-white shadow-md px-4 py-2 text-sm w-full rounded-md"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            {allStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          
          <select
            className="border-0 outline-0 bg-white shadow-md px-4 py-2 text-sm w-full rounded-md"
            value={lgaFilter}
            onChange={(e) => setLgaFilter(e.target.value)}
            disabled={stateFilter === "All States"}
          >
            {availableLgas.map(lga => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>
          
          <select
            className="border-0 outline-0 bg-white shadow-md px-4 py-2 text-sm w-full rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <select
            className="border-0 outline-0 bg-white shadow-md px-4 py-2 text-sm w-full rounded-md"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {rowsOptions.map(rows => (
              <option key={rows} value={rows}>Show {rows}</option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border rounded text-sm whitespace-nowrap bg-white shadow-md w-full md:w-auto" onClick={exportToCSV}>
            <FiDownload /> Export
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-full md:w-auto shadow-md hover:bg-blue-700 transition">
            + Add New Project
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="overflow-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Project Name", "Consultant", "Start Date", "Finish Date", "State", "LGA", "Status", "Successful"].map(
                (head, i) => (
                  <th key={i} className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProjects.slice(0, rowsPerPage).map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4">{item.consultant}</td>
                <td className="px-6 py-4">{item.start}</td>
                <td className="px-6 py-4">{item.finish}</td>
                <td className="px-6 py-4">{item.state}</td>
                <td className="px-6 py-4">{item.lga}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">{item.successful}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProjects.length === 0 && (
          <div className="bg-white p-8 text-center text-gray-500">
            No projects found matching your criteria
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 text-sm">
          <p className="text-gray-500 mb-4 sm:mb-0">
            Showing 1 to {Math.min(rowsPerPage, filteredProjects.length)} of {filteredProjects.length} entries
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}