import React, { useState } from "react";
import { Pencil, Search, Clock, LogIn, Key, FileText } from "lucide-react";
import {
    FaFileAlt,
    FaChartBar,
    FaMapMarkedAlt,
    FaUsers,
    FaShieldAlt,
  } from "react-icons/fa";

const users = [
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Editor",
    access: ["Projects", "Reports"],
    status: "Active",
    time: "2 hours ago",
    activity: "logged in to the system",
    activityIcon: LogIn,
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Analyst",
    access: ["Analytics", "Reports"],
    status: "Active",
    time: "4 hours ago",
    activity: "updated project permissions",
    activityIcon: Key,
  },
  {
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "Supervisor",
    access: ["Projects", "Users", "Reports"],
    status: "Inactive",
    time: "6 hours ago",
    activity: "generated monthly report",
    activityIcon: FileText,
  },
];

export default function AccessControl() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    
    setFilteredUsers(filtered);
  };

  // Function to generate avatar URL based on name
  const getAvatarUrl = (name) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&rounded=true&size=40`;
  };

  return (
    <div className="p-4 md:p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Access Control</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user roles and permissions</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center gap-2 w-full md:w-auto justify-center">
          <span>+ Add New Sub-Admin</span>
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, role or email"
            className="pl-10 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm rounded-md px-3 py-2 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm rounded-md px-3 py-2 w-full md:w-auto">
            <option>All Roles</option>
            <option>Editor</option>
            <option>Analyst</option>
            <option>Supervisor</option>
          </select>
          <select className="border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm rounded-md px-3 py-2 w-full md:w-auto">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Summary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={getAvatarUrl(user.name)}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.access.map((acc, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full"
                      >
                        {acc}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                    }}
                    >
                    <Pencil className="w-4 h-4" />
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 px-2">
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
          <span className="font-medium">{users.length}</span> entries
        </p>
        <div className="inline-flex rounded-md shadow-sm">
          <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            &lt;
          </button>
          <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            4
          </button>
          <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            &gt;
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
          Recent Activity
        </h2>
        <ul className="space-y-3">
          {users.map((user, idx) => {
            const ActivityIcon = user.activityIcon;
            return (
              <li key={idx} className="text-sm pl-3 relative">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-3 rounded bg-gray-200 text-gray-600">
                    <ActivityIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">
                      <span className="font-medium text-md">{user.name}</span> {user.activity}
                    </p>
                    <div className="flex items-center text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1 text-sm" />
                      <span className="text-sm">{user.time}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {showModal && selectedUser && (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Access - {selectedUser.name}
        </h3>

        {/* Role selection */}
        <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-1">Role</label>
            <select
            className="w-full px-3 py-2 border-0 outline-0 rounded-md shadow-md bg-[#E5E7EB]"
            defaultValue={selectedUser.role}
            >
            <option value="Editor">Editor</option>
            <option value="Analyst">Analyst</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Admin">Admin</option>
            </select>
        </div>

       {/* Permissions */}
<div className="mb-6">
  <label className="block text-md font-medium text-gray-700 mb-2">
    Module Permissions
  </label>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {[
      { label: "Generate Report", icon: <FaFileAlt /> },
      { label: "View Reports", icon: <FaChartBar /> },
      { label: "View Projects", icon: <FaChartBar /> },
      { label: "Generate Reports", icon: <FaChartBar /> },
      { label: "View Analytics", icon: <FaChartBar /> },
      { label: "Map View", icon: <FaMapMarkedAlt /> },
      { label: "User Management", icon: <FaUsers /> },
      { label: "Access Control", icon: <FaShieldAlt /> },
    ].map((perm, i) => (
      <label
        key={i}
        className="flex items-center gap-3 p-2 rounded-lg text-sm text-gray-800"
      >
        <input type="checkbox" className="accent-blue-600" />
        <span className="flex items-center gap-2 text-gray-700">
          {perm.icon} {perm.label}
        </span>
      </label>
    ))}
  </div>
</div>


        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
            <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm w-full sm:w-auto"
            onClick={() => {
                setShowModal(false);
                setSelectedUser(null);
            }}
            >
            Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm w-full sm:w-auto">
            Save Changes
            </button>
        </div>
        </div>
    </div>
    )}
    </div>
  );
}