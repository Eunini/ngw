import React from "react";
import { FaDownload, FaPlus, FaCogs } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const NewEntry = () => {
  const waterData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Water Quality Index",
        data: [80, 75, 70, 85, 90, 88, 92],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f655",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Geographic Distribution</h2>
            <div className="flex gap-2">
              <select className="border rounded p-1 text-sm">
                <option>All Regions</option>
              </select>
              <select className="border rounded p-1 text-sm">
                <option>All Subzones</option>
              </select>
            </div>
          </div>
          <img
            src="/map.png"
            alt="Map"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Active Alerts</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-red-100 text-red-700 p-2 rounded flex items-center gap-2">
                <FiAlertCircle /> Critical: Water supply below threshold in Zone A
              </div>
              <div className="bg-yellow-100 text-yellow-700 p-2 rounded flex items-center gap-2">
                <FiAlertCircle /> Maintenance required for Pump Station 3
              </div>
              <div className="bg-blue-100 text-blue-700 p-2 rounded flex items-center gap-2">
                <FiAlertCircle /> New water quality report available
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
            <div className="flex flex-col gap-2 text-sm">
              <button className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded">
                <FaPlus /> Add Project
              </button>
              <button className="flex items-center gap-2 p-2 border rounded">
                <FaDownload /> Download Report
              </button>
              <button className="flex items-center gap-2 p-2 border rounded">
                <FaCogs /> Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium mb-4">Recent Activities</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="p-2">Project</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Borehole Installation", "North Region", "Ongoing", "2024-06-15"],
                  ["Water Quality Test", "Central District", "Completed", "2024-06-13"],
                  ["Pipeline Repair", "South Region", "Ongoing", "2024-06-11"],
                  ["Treatment Plant Upgrade", "East Zone", "Completed", "2024-06-12"],
                ].map(([project, location, status, date], index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{project}</td>
                    <td className="p-2">{location}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-2">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium mb-4">Water Quality Trend</h3>
          <Line data={waterData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
