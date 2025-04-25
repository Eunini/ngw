import React, { useState } from "react";
import UserDashboardHeader from "./UserDashboardHeader";

export const projectDatabase = [
  {
    projectID: 1,
    clientName: "John Bill",
    location: "Kano",
    address: "No 2, Tutu street, Abanigbe, Kano",
    state: "Kano",
    LGA: "",
    type: "Federal",
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2023-11-30",
    hydrogeologist: "Graham Bell",
    engineer: "Dr. Alexandar",
    drilling_contractor: "A Contractors",
    overburden: 33,
    depth: 45,
    fractured_depth: 42,
    weathered_zone: "Not recorded",
    curve_type: "Standard",
    actual_drilled_depth: 33,
    actual_overburden: 47,
    actual_fractured_zone: "Not recorded",
    actual_weathered_zone: "Not recorded",
    depth_installed: 78,
    discharging_rate: 65,
    water_cut: "Yes",
    static_water_level: "Not measured",
  },
  {
    projectID: 2,
    clientName: "Lagos State Water Board",
    location: "Lagos",
    address: "Central Lagos",
    state: "Lagos",
    LGA: "",
    type: "State",
    status: "ongoing",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    hydrogeologist: "Not assigned",
    engineer: "Site Engineer",
    drilling_contractor: "Not applicable",
    overburden: 0,
    depth: 0,
    fractured_depth: 0,
    weathered_zone: "Not applicable",
    curve_type: "Not applicable",
    actual_drilled_depth: 0,
    actual_overburden: 0,
    actual_fractured_zone: "Not applicable",
    actual_weathered_zone: "Not applicable",
    depth_installed: 0,
    discharging_rate: 0,
    water_cut: "No",
    static_water_level: "Not applicable",
  },
  {
    projectID: 3,
    clientName: "Oyo State Agency",
    location: "Ibadan",
    address: "Ibadan North",
    state: "Ibadan",
    LGA: "Ibadan North",
    type: "Agency",
    status: "Completed",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    hydrogeologist: "Field Specialist",
    engineer: "Project Engineer",
    drilling_contractor: "Local Contractor",
    overburden: 25,
    depth: 50,
    fractured_depth: 45,
    weathered_zone: 15,
    curve_type: "Standard",
    actual_drilled_depth: 50,
    actual_overburden: 25,
    actual_fractured_zone: 45,
    actual_weathered_zone: 15,
    depth_installed: 50,
    discharging_rate: 40,
    water_cut: "Yes",
    static_water_level: 10,
  },
  {
    projectID: 4,
    clientName: "Federal Ministry",
    location: "Enugu",
    address: "Enugu East",
    state: "Enugu",
    LGA: "Enugu East",
    type: "Federal",
    status: "completed",
    startDate: "2023-01-01",
    endDate: "2023-11-15",
    hydrogeologist: "Not assigned",
    engineer: "Not assigned",
    drilling_contractor: "Not applicable",
    overburden: 0,
    depth: 0,
    fractured_depth: 0,
    weathered_zone: "Not applicable",
    curve_type: "Not applicable",
    actual_drilled_depth: 0,
    actual_overburden: 0,
    actual_fractured_zone: "Not applicable",
    actual_weathered_zone: "Not applicable",
    depth_installed: 0,
    discharging_rate: 0,
    water_cut: "No",
    static_water_level: "Not applicable",
  },
  {
    projectID: 5,
    clientName: "Gombe LGA",
    location: "Gombe",
    address: "Gombe South",
    state: "Gombe",
    LGA: "Gombe South",
    type: "State",
    status: "ongoing",
    startDate: "2022-12-01",
    endDate: "2023-02-28",
    hydrogeologist: "Field Specialist",
    engineer: "Site Engineer",
    drilling_contractor: "Local Drillers",
    overburden: 20,
    depth: 60,
    fractured_depth: 55,
    weathered_zone: 12,
    curve_type: "Standard",
    actual_drilled_depth: 60,
    actual_overburden: 20,
    actual_fractured_zone: 55,
    actual_weathered_zone: 12,
    depth_installed: 60,
    discharging_rate: 35,
    water_cut: "Yes",
    static_water_level: 8,
  },
  {
    projectID: 6,
    clientName: "Private Owner",
    location: "Enugu",
    address: "Enugu West",
    state: "Enugu",
    LGA: "Enugu West",
    type: "Individual",
    status: "completed",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    hydrogeologist: "Not assigned",
    engineer: "Not assigned",
    drilling_contractor: "Not applicable",
    overburden: 0,
    depth: 0,
    fractured_depth: 0,
    weathered_zone: "Not applicable",
    curve_type: "Not applicable",
    actual_drilled_depth: 0,
    actual_overburden: 0,
    actual_fractured_zone: "Not applicable",
    actual_weathered_zone: "Not applicable",
    depth_installed: 0,
    discharging_rate: 0,
    water_cut: "No",
    static_water_level: "Not applicable",
  },
];

function DatabaseCard() {
  const [end, setEnd] = useState(15);
  const [isOpen, setIsOpen] = useState(false);
  const [popUpData, setPopUpData] = useState([]);

  const openPopup = (data) => {
    setPopUpData(data);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleViewMore = () => {
    setEnd(end + 6);
  };

  return (
    <section className="text-black md:pl-64 2xl:w-[93%] xl:w-[97%] lg:w-[92%] md:w-[98%] w-full pl-0 flex flex-col items-center md:max-w-screen">
      <UserDashboardHeader activeSection="Projects" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md w-[90%]">
        <div className="p-6 pb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Project Database</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projectDatabase.slice(0, end).map((data, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td
                    onClick={() => openPopup(data)}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline cursor-pointer hover:text-blue-500"
                  >
                    {data.projectID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        data.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : data.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-blue/50 backdrop-blur z-50">
              <div className="bg-white shadow-xl p-6 rounded-lg relative w-[80%]">
                <button
                  onClick={closePopup}
                  className="absolute top-2 right-2 text-xl font-bold text-gray-600"
                >
                  &times;
                </button>
                <div className="flex flex-row flex-wrap justify-between gap-6 p-4 bg-gray-50 rounded-xl shadow-sm">
                  {/* Project Details */}
                  <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[48%] lg:w-[30%]">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                      Project Details
                    </h3>
                    <p>
                      <strong>Project ID:</strong> {popUpData.projectID}
                    </p>
                    <p>
                      <strong>Client Name:</strong> {popUpData.clientName}
                    </p>
                    <p>
                      <strong>Location:</strong> {popUpData.location}
                    </p>
                    <p>
                      <strong>Type:</strong> {popUpData.type}
                    </p>
                    <p>
                      <strong>Agency Name:</strong> {popUpData.agencyName}
                    </p>
                    <p>
                      <strong>Status:</strong> {popUpData.status}
                    </p>
                  </div>

                  {/* Assigned Team */}
                  <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[48%] lg:w-[30%]">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                      Assigned Team
                    </h3>
                    <p>
                      <strong>Lead Hydrogeologist:</strong>{" "}
                      {popUpData.hydrogeologist}
                    </p>
                    <p>
                      <strong>Civil/Water Engineer:</strong>{" "}
                      {popUpData.engineer}
                    </p>
                    <p>
                      <strong>Drilling Contractor:</strong>{" "}
                      {popUpData.drilling_contractor}
                    </p>
                  </div>

                  {/* Geological Data */}
                  <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[48%] lg:w-[30%]">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                      Geological Data
                    </h3>
                    <p>
                      <strong>Overburden:</strong> {popUpData.overburden}
                    </p>
                    <p>
                      <strong>Depth:</strong> {popUpData.depth}
                    </p>
                    <p>
                      <strong>Fractured Depth:</strong>{" "}
                      {popUpData.fractured_depth}
                    </p>
                    <p>
                      <strong>Weathered Zone:</strong>{" "}
                      {popUpData.weathered_zone}
                    </p>
                    <p>
                      <strong>Curve Type:</strong> {popUpData.curve_type}
                    </p>
                  </div>

                  {/* Drilling Data */}
                  <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[48%] lg:w-[30%]">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                      Drilling Data
                    </h3>
                    <p>
                      <strong>Actual Overburden:</strong>{" "}
                      {popUpData.actual_overburden}
                    </p>
                    <p>
                      <strong>Actual Fractured Zone:</strong>{" "}
                      {popUpData.actual_fractured_zone}
                    </p>
                    <p>
                      <strong>Actual Weathered Zone:</strong>{" "}
                      {popUpData.actual_weathered_zone}
                    </p>
                    <p>
                      <strong>Actual Depth Drilled:</strong>{" "}
                      {popUpData.actual_drilled_depth}
                    </p>
                  </div>

                  {/* Installation and yield info */}
                  <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[48%] lg:w-[30%]">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                      Installation and Yield Info
                    </h3>
                    <p>
                      <strong>Depth Installed:</strong>{" "}
                      {popUpData.depth_installed}
                    </p>
                    <p>
                      <strong>Discharging Rate (Litre per minute):</strong>{" "}
                      {popUpData.discharging_rate} /m
                    </p>
                    <p>
                      <strong>Does the Water Cut?:</strong>{" "}
                      {popUpData.water_cut}
                    </p>
                    <p>
                      <strong>Static Water Level:</strong>{" "}
                      {popUpData.static_water_level}
                    </p>
                  </div>

                  {/* Site Media */}
                  <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[48%] lg:w-[30%]">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                      Site Media
                    </h3>
                    {/* Add media thumbnails or text here later */}
                    <p className="text-gray-500 italic">No media uploaded.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleViewMore}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 float-right p-2 cursor-pointer"
        >
          View More
        </button>
      </div>
    </section>
  );
}

export default DatabaseCard;
