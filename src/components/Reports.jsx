// import UserDashboardHeader from "./UserDashboardHeader";
// import { Filter, Calendar, Download } from "lucide-react";
import {useRef} from "react";
// import { usePDF } from "react-to-pdf";
// import flatpickr from "flatpickr";
// import "flatpickr/dist/themes/airbnb.css";
// import { projectDatabase } from "./DatabaseCard";

// // compatible styles with pdf print
// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginBottom: "20px",
// };

// const thStyle = {
//   border: "1px solid #ccc",
//   padding: "8px",
//   textAlign: "left",
//   backgroundColor: "#f5f5f5",
// };

// const tdStyle = {
//   border: "1px solid #ccc",
//   padding: "8px",
// };

// const statusStyle = (status) => ({
//   display: "inline-block",
//   padding: "2px 6px",
//   fontSize: "12px",
//   fontWeight: "600",
//   borderRadius: "8px",
//   backgroundColor: status === "completed" ? "#d1fae5" : "#fef3c7",
//   color: status === "completed" ? "#065f46" : "#92400e",
// });

// // reports list
// const reports = [
//   {
//     id: "project-summary",
//     name: "Project Summary Report",
//     description:
//       "General overview of the project (type, location, status, GPS, visuals)",
//   },
//   {
//     id: "geological",
//     name: "Geological Report",
//     description: "Overburden, fracture depth, weathered zone, curve type",
//   },
//   {
//     id: "drilling",
//     name: "Drilling Report",
//     description:
//       "Drilling method, depth drilled, penetration rate, casing used",
//   },
//   {
//     id: "installation",
//     name: "Installation & Discharge Report",
//     description:
//       "Pump depth, discharge rate, static water level, water cut incidence",
//   },
//   {
//     id: "media",
//     name: "Media & GPS Report",
//     description: "Photos and videos uploaded, geolocation preview",
//   },
//   {
//     id: "monthly",
//     name: "Monthly Work Log",
//     description: "Timeline of projects handled within a given period",
//   },
//   {
//     id: "community",
//     name: "Community Impact Snapshot",
//     description:
//       "Optional report if user collects public or beneficiary feedback",
//   },
// ];

const DateRangePicker = ({ onChange }) => {
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fromPicker = flatpickr(fromRef.current, {
      dateFormat: "Y-m-d",
      allowInput: true,
      onChange: (selectedDates) => {
        const dateStr = selectedDates[0]?.toISOString().split("T")[0] || "";
        setFromDate(dateStr);
        toPicker.set("minDate", selectedDates[0]);
        handleChange(dateStr, toDate);
      },
    });

    const toPicker = flatpickr(toRef.current, {
      dateFormat: "Y-m-d",
      allowInput: true,
      onChange: (selectedDates) => {
        const dateStr = selectedDates[0]?.toISOString().split("T")[0] || "";
        setToDate(dateStr);
        handleChange(fromDate, dateStr);
      },
    });

    const handleChange = (from, to) => {
      const fromD = from ? new Date(from) : null;
      const toD = to ? new Date(to) : null;
      onChange?.([fromD, toD]);
    };

    return () => {
      fromPicker.destroy();
      toPicker.destroy();
    };
  }, [fromDate, toDate, onChange]);

  return (
    <div className="flex items-center gap-4 px-3 py-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 text-sm">From:</span>
        <div className="relative">
          <input
            ref={fromRef}
            value={fromDate}
            readOnly
            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Select date"
          />
          <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-700 text-sm">To:</span>
        <div className="relative">
          <input
            ref={toRef}
            value={toDate}
            readOnly
            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Select date"
          />
          <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

// function Reports() {
//   const reportRef = useRef();
//   const { toPDF, targetRef } = usePDF({
//     filename: "project_report.pdf",
//     page: {
//       margin: 20,
//       format: "A4",
//       orientation: "portrait",
//     },
//   });

//   const [dateRange, setDateRange] = useState([]);
//   const [states, setStates] = useState([]);
//   const [LGAs, setLGAs] = useState([]);
//   const [filters, setFilters] = useState({
//     state: "",
//     lga: "",
//     status: "",
//     projectId: "",
//   });
//   const [selectedReports, setSelectedReports] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState(projectDatabase);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const generateReport = () => {
//     if (selectedReports.length === 0) {
//       alert("Please select at least one report type");
//       return;
//     }
//     setIsGenerating(true);
//     toPDF()
//       .then(() => setIsGenerating(false))
//       .catch((error) => {
//         console.error("PDF generation failed:", error);
//         setIsGenerating(false);
//       });
//   };

//   // Fetch all states
//   useEffect(() => {
//     fetch("https://nga-states-lga.onrender.com/fetch")
//       .then((response) => response.json())
//       .then((data) => setStates(data))
//       .catch((error) => console.error("Error fetching states:", error));
//   }, []);

//   // Fetch LGAs when state is selected
//   useEffect(() => {
//     if (!filters.state) return;
//     fetch(`https://nga-states-lga.onrender.com/?state=${filters.state}`)
//       .then((res) => res.json())
//       .then((data) => setLGAs(data))
//       .catch((error) => console.log("Error fetching LGAs:", error));
//   }, [filters.state]);

//   // Apply filters
//   useEffect(() => {
//     let results = projectDatabase;

//     if (filters.status) {
//       results = results.filter((project) => project.status === filters.status);
//     }

//     if (filters.state) {
//       results = results.filter((project) => project.state === filters.state);
//     }

//     if (filters.lga) {
//       results = results.filter((project) => project.LGA === filters.lga);
//     }

//     if (filters.projectId) {
//       results = results.filter((project) =>
//         project.projectID
//           .toLowerCase()
//           .includes(filters.projectId.toLowerCase())
//       );
//     }

//     if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
//       results = results.filter((project) => {
//         if (!project.startDate) return true;
//         const projectDate = new Date(project.startDate);
//         return projectDate >= dateRange[0] && projectDate <= dateRange[1];
//       });
//     }

//     setFilteredProjects(results);
//   }, [filters, dateRange]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const toggleReportSelection = (reportId) => {
//     setSelectedReports((prev) =>
//       prev.includes(reportId)
//         ? prev.filter((id) => id !== reportId)
//         : [...prev, reportId]
//     );
//   };

//   // Render report content based on type
//   const renderReportContent = (reportId) => {
//     switch (reportId) {
//       case "project-summary":
//         return (
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>Project ID</th>
//                 <th style={thStyle}>Status</th>
//                 <th style={thStyle}>Type</th>
//                 <th style={thStyle}>Location</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.projectID}>
//                   <td style={tdStyle}>{project.projectID}</td>
//                   <td style={tdStyle}>
//                     <span style={statusStyle(project.status)}>
//                       {project.status}
//                     </span>
//                   </td>
//                   <td style={tdStyle}>{project.type}</td>
//                   <td style={tdStyle}>
//                     {project.state} - {project.LGA}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         );

//       case "geological":
//         return (
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>Project ID</th>
//                 <th style={thStyle}>Overburden</th>
//                 <th style={thStyle}>Fracture Depth</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.projectID}>
//                   <td style={tdStyle}>{project.projectID}</td>
//                   <td style={tdStyle}>
//                     {project.geologicalData?.overburden || "N/A"}
//                   </td>
//                   <td style={tdStyle}>
//                     {project.geologicalData?.fractureDepth || "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         );

//       case "drilling":
//         return (
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>Project ID</th>
//                 <th style={thStyle}>Drilling Method</th>
//                 <th style={thStyle}>Depth Drilled</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.projectID}>
//                   <td style={tdStyle}>{project.projectID}</td>
//                   <td style={tdStyle}>
//                     {project.drillingData?.method || "N/A"}
//                   </td>
//                   <td style={tdStyle}>
//                     {project.drillingData?.depth || "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         );

//       case "installation":
//         return (
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>Project ID</th>
//                 <th style={thStyle}>Pump Depth</th>
//                 <th style={thStyle}>Discharge Rate</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.projectID}>
//                   <td style={tdStyle}>{project.projectID}</td>
//                   <td style={tdStyle}>
//                     {project.installationData?.pumpDepth || "N/A"}
//                   </td>
//                   <td style={tdStyle}>
//                     {project.installationData?.dischargeRate || "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         );

//       case "media":
//         return (
//           <div>
//             <p style={{ color: "#666", marginBottom: "12px" }}>
//               Media and GPS data would be displayed here
//             </p>
//             {filteredProjects.map((project) => (
//               <div key={project.projectID} style={{ marginBottom: "10px" }}>
//                 <h4 style={{ fontWeight: "600" }}>{project.projectID}</h4>
//                 <p style={{ fontSize: "14px", color: "#555" }}>
//                   GPS Coordinates: {project.gpsCoordinates || "N/A"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         );

//       case "monthly":
//         return (
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>Project ID</th>
//                 <th style={thStyle}>Start Date</th>
//                 <th style={thStyle}>End Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProjects.map((project) => (
//                 <tr key={project.projectID}>
//                   <td style={tdStyle}>{project.projectID}</td>
//                   <td style={tdStyle}>
//                     {project.startDate
//                       ? new Date(project.startDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td style={tdStyle}>
//                     {project.endDate
//                       ? new Date(project.endDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         );

//       case "community":
//         return (
//           <div>
//             <p style={{ color: "#666", marginBottom: "12px" }}>
//               Community impact data would be displayed here
//             </p>
//             {filteredProjects.map((project) => (
//               <div key={project.projectID} style={{ marginBottom: "10px" }}>
//                 <h4 style={{ fontWeight: "600" }}>{project.projectID}</h4>
//                 <p style={{ fontSize: "14px", color: "#555" }}>
//                   Beneficiary Feedback:{" "}
//                   {project.communityImpact?.feedback || "No feedback collected"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         );

//       default:
//         return (
//           <p style={{ color: "#666" }}>Select report types to view data</p>
//         );
//     }
//   };

//   return (
//     <section className="md:pl-64 pl-0 w-full min-h-screen bg-gray-50">
//       <UserDashboardHeader activeSection={"Reports"} />

//       <div className="p-4 md:p-6 space-y-6">
//         {/* Header with date picker */}
//         <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               Project Reports
//             </h2>
//             <p className="text-sm text-gray-600">
//               Generate and download professional project reports
//             </p>
//           </div>
//           <DateRangePicker onChange={(dates) => setDateRange(dates)} />
//         </div>

//         {/* Report type selection */}
//         <div className="bg-white rounded-xl shadow-sm p-4">
//           <h3 className="text-sm font-semibold text-gray-800 mb-3">
//             Select Report Types
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//             {reports.map((report) => (
//               <label
//                 key={report.id}
//                 className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded"
//               >
//                 <input
//                   type="checkbox"
//                   className="mt-1 form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   checked={selectedReports.includes(report.id)}
//                   onChange={() => toggleReportSelection(report.id)}
//                 />
//                 <div>
//                   <span className="text-sm font-medium text-gray-700">
//                     {report.name}
//                   </span>
//                   <p className="text-xs text-gray-500">{report.description}</p>
//                 </div>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm p-4">
//           <div className="flex items-center gap-2 text-gray-800 mb-4">
//             <Filter className="w-4 h-4" />
//             <h3 className="text-sm font-semibold">Filter Projects</h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {/* Project Status */}
//             <div>
//               <label
//                 htmlFor="status"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Project Status
//               </label>
//               <select
//                 id="status"
//                 name="status"
//                 value={filters.status}
//                 onChange={handleFilterChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
//               >
//                 <option value="">All Status</option>
//                 <option value="completed">Completed</option>
//                 <option value="ongoing">Ongoing</option>
//               </select>
//             </div>

//             {/* State */}
//             <div>
//               <label
//                 htmlFor="state"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 State
//               </label>
//               <select
//                 id="state"
//                 name="state"
//                 value={filters.state}
//                 onChange={handleFilterChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
//               >
//                 <option value="">All States</option>
//                 {states.map((state, index) => (
//                   <option key={index} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* LGA */}
//             <div>
//               <label
//                 htmlFor="lga"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 LGA
//               </label>
//               <select
//                 id="lga"
//                 name="lga"
//                 value={filters.lga}
//                 onChange={handleFilterChange}
//                 disabled={!filters.state}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100"
//               >
//                 <option value="">All LGAs</option>
//                 {LGAs.map((lga, index) => (
//                   <option key={index} value={lga}>
//                     {lga}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Project ID */}
//             <div>
//               <label
//                 htmlFor="projectId"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Project ID
//               </label>
//               <input
//                 type="text"
//                 id="projectId"
//                 name="projectId"
//                 value={filters.projectId}
//                 onChange={handleFilterChange}
//                 placeholder="Enter Project ID"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Report Preview */}
//         <div className="bg-white rounded-xl shadow-sm p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-sm font-semibold text-gray-800">
//               Report Preview
//             </h3>
//             <button
//               onClick={generateReport}
//               disabled={isGenerating || selectedReports.length === 0}
//               className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
//                 isGenerating || selectedReports.length === 0
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               {isGenerating ? (
//                 "Generating PDF..."
//               ) : (
//                 <>
//                   <Download className="w-4 h-4" />
//                   Generate PDF Report
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Visible preview */}
//           <div className="space-y-6">
//             {selectedReports.length > 0 ? (
//               selectedReports.map((reportId) => (
//                 <div key={reportId} className="border rounded-lg p-4">
//                   <h3 className="text-lg font-semibold mb-4">
//                     {reports.find((r) => r.id === reportId)?.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-4">
//                     {reports.find((r) => r.id === reportId)?.description}
//                   </p>
//                   {renderReportContent(reportId)}
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-sm text-gray-500">
//                   Please select at least one report type to see preview
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Hidden content for PDF generation */}
//           <div ref={targetRef} className="hidden">
//             <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
//               <div className="text-center mb-8">
//                 <h1 className="text-2xl font-bold mb-2">Project Report</h1>
//                 <p style={{ color: "#6b7280" }}>
//                   Generated on: {new Date().toLocaleDateString()}
//                 </p>
//                 {dateRange.length === 2 && (
//                   <p style={{ color: "#6b7280" }}>
//                     Date Range: {dateRange[0]?.toLocaleDateString()} -{" "}
//                     {dateRange[1]?.toLocaleDateString()}
//                   </p>
//                 )}
//               </div>

//               {selectedReports.map((reportId) => (
//                 <div key={reportId} style={{ marginBottom: "2rem" }}>
//                   <h2
//                     style={{
//                       fontSize: "1.25rem",
//                       fontWeight: "600",
//                       borderBottom: "1px solid #e5e7eb",
//                       paddingBottom: "0.5rem",
//                       marginBottom: "1rem",
//                     }}
//                   >
//                     {reports.find((r) => r.id === reportId)?.name}
//                   </h2>
//                   <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
//                     {reports.find((r) => r.id === reportId)?.description}
//                   </p>
//                   {renderReportContent(reportId)}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Reports;

import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Filter, Calendar, Download } from 'lucide-react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { projectDatabase } from './DatabaseCard';
import UserDashboardHeader from "./UserDashboardHeader";

// Register font
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2' }, // Regular
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2', fontWeight: 700 } // Bold
  ]
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  section: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
    paddingBottom: 5
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    fontSize: 12,
    fontWeight: 'bold',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  tableCell: {
    padding: 8,
    fontSize: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  statusBadge: {
    padding: '2px 8px',
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 'bold'
  }
});

const Reports = () => {
  const [dateRange, setDateRange] = useState([]);
  const [states, setStates] = useState([]);
  const [LGAs, setLGAs] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    lga: "",
    status: "",
    projectId: "",
  });
  const [selectedReports, setSelectedReports] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projectDatabase);

  // Fetch all states
  useEffect(() => {
    fetch("https://nga-states-lga.onrender.com/fetch")
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  // Fetch LGAs when state is selected
  useEffect(() => {
    if (!filters.state) return;
    fetch(`https://nga-states-lga.onrender.com/?state=${filters.state}`)
      .then((res) => res.json())
      .then((data) => setLGAs(data))
      .catch((error) => console.log("Error fetching LGAs:", error));
  }, [filters.state]);

  // Apply filters whenever they change
  useEffect(() => {
    let results = projectDatabase;

    if (filters.status) {
      results = results.filter((project) => project.status === filters.status);
    }

    if (filters.state) {
      results = results.filter((project) => project.state === filters.state);
    }

    if (filters.lga) {
      results = results.filter((project) => project.LGA === filters.lga);
    }

    if (filters.projectId) {
      results = results.filter((project) =>
        project.projectID.toLowerCase().includes(filters.projectId.toLowerCase())
      );
    }

    if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      results = results.filter((project) => {
        if (!project.startDate) return true;
        const projectDate = new Date(project.startDate);
        return projectDate >= dateRange[0] && projectDate <= dateRange[1];
      });
    }

    setFilteredProjects(results);
  }, [filters, dateRange]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleReportSelection = (reportId) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  // PDF Document Component
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Project Report</Text>
          <Text style={styles.subtitle}>
            Generated on: {new Date().toLocaleDateString()}
          </Text>
          {dateRange.length === 2 && (
            <Text style={styles.subtitle}>
              Date Range: {dateRange[0]?.toLocaleDateString()} - {dateRange[1]?.toLocaleDateString()}
            </Text>
          )}
        </View>

        {selectedReports.includes("project-summary") && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Summary Report</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Project ID</Text>
                <Text style={styles.tableHeader}>Status</Text>
                <Text style={styles.tableHeader}>Type</Text>
                <Text style={styles.tableHeader}>Location</Text>
              </View>
              
              {/* Table Rows */}
              {filteredProjects.map((project) => (
                <View key={project.projectID} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{project.projectID}</Text>
                  <Text style={[
                    styles.tableCell,
                    styles.statusBadge,
                    project.status === 'completed' 
                      ? { backgroundColor: '#DCFCE7', color: '#166534' } 
                      : { backgroundColor: '#FEF08A', color: '#854D0E' }
                  ]}>
                    {project.status}
                  </Text>
                  <Text style={styles.tableCell}>{project.type}</Text>
                  <Text style={styles.tableCell}>{project.state} - {project.LGA}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Add other report sections here */}
      </Page>
    </Document>
  );

  return (
    <div className="md:pl-64 pl-0 p-4 md:p-6 space-y-6">
      <UserDashboardHeader activeSection={"Reports"}/>
      {/* Filters UI */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 text-gray-800 mb-4">
          <Filter className="w-4 h-4" />
          <h3 className="text-sm font-semibold">Filter Projects</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Project Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Project Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>
          
          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="state"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All States</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          
          {/* LGA */}
          <div>
            <label htmlFor="lga" className="block text-sm font-medium text-gray-700 mb-1">
              LGA
            </label>
            <select
              id="lga"
              name="lga"
              value={filters.lga}
              onChange={handleFilterChange}
              disabled={!filters.state}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100"
            >
              <option value="">All LGAs</option>
              {LGAs.map((lga, index) => (
                <option key={index} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
          
          {/* Project ID */}
          <div>
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
              Project ID
            </label>
            <input
              type="text"
              id="projectId"
              name="projectId"
              value={filters.projectId}
              onChange={handleFilterChange}
              placeholder="Enter Project ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <DateRangePicker onChange={(dates) => setDateRange(dates)} />
      </div>

      {/* Report Selection */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Select Reports to Include</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              className="mt-1 form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              checked={selectedReports.includes("project-summary")}
              onChange={() => toggleReportSelection("project-summary")}
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Project Summary</span>
              <p className="text-xs text-gray-500">General overview of projects</p>
            </div>
          </label>
          {/* Add other report options here */}
        </div>
      </div>

      {/* PDF Download Button */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        {selectedReports.length > 0 ? (
          <PDFDownloadLink
            document={<MyDocument />}
            fileName="project_report.pdf"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" />
                {loading ? 'Preparing PDF...' : 'Download Report'}
              </>
            )}
          </PDFDownloadLink>
        ) : (
          <button
            disabled
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Select reports to download
          </button>
        )}
      </div>
    </div>
  );
};

export default Reports;
