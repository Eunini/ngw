import {
  Bell,
  ChevronDown,
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  RefreshCcw,
  LineChart,
  BarChart,
  Clock,
  ChevronRight,
  ArrowRight,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MapComponentDashboard from "./MapComponentDashboard";
import { useActiveTab } from "./ActiveTabContext";
// import { notifications } from "./DashboardHomeComponent";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { projectDatabase } from "./DatabaseCard";
import UserDashboardHeader from "./UserDashboardHeader";

export const notifications = [
  {
    title: "New Borehole Added",
    time: "2 hours ago",
    description: "BH-2024-001 added to Site A",
    icon : (<PlusCircle className="text-blue-500 w-4 h-4" />)
  },
  {
    title: "Report Generated",
    time: "4 hours ago",
    description: "Monthly analysis report",
    icon : (<LineChart className="text-blue-500 w-4 h-4" />)
  },
  {
    title: "Data Updated",
    time: "6 hours ago",
    description: "Sensor readings updated",
    icon: (<BarChart className="text-blue-500 w-4 h-4" />)
  },
  {
    title: "Data Updated",
    time: "6 hours ago",
    description: "Sensor readings updated",
    icon: (<BarChart className="text-blue-500 w-4 h-4" />)
  },
  {
    title: "Data Updated",
    time: "6 hours ago",
    description: "Sensor readings updated",
    icon: (<BarChart className="text-blue-500 w-4 h-4" />)
  },
];


export const chartData = [
  {
    label: "Completed",
    value: 24,
  },
  {
    label: "Ongoing",
    value: 14,
  },
];

function UserDashboardHome() {
  const navigate = useNavigate();
  const { isActive, setIsActive } = useActiveTab();

  return (
    <section className="text-black md:pl-64 2xl:w-[93%] xl:w-[97%] lg:w-[92%] md:w-[98%] w-full pl-0  flex flex-col items-center md:max-w-screen">
      <UserDashboardHeader activeSection={"Dashboard"} />
      <div className="w-full flex flex-row flex-wrap gap-4 items-center px-4">
        <div className="w-40 h-20 py-2 px-2 ">
          <h1 className="font-bold text-[14px] font-poppins pb-2 ">
            Add New Entry
          </h1>
          <button
            onClick={() => setIsActive("New Entry")}
            className="bg-blue-500 text-white text-[12px] p-2 rounded-3xl font-semibold flex flex-row items-center gap-2 cursor-pointer 
            hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 hover:font-bold"
          >
            <PlusCircle className="w-4 h-4" />
            New Entry
          </button>
        </div>
        {[
          {
            title: "Total Projects",
            value: "200",
            icon: <FolderKanban className="w-6 h-6" />,
            color: "red-500",
          },
          {
            title: "Completed Projects",
            value: "178",
            icon: <CheckCircle2 className="w-6 h-6" />,
            color: "blue-500",
          },
          {
            title: "Ongoing Projects",
            value: "22",
            icon: <RefreshCcw className="w-6 h-6" />,
            color: "[#1A365D]",
          },
        ].map((content, index) => (
          <div
            key={index}
            className="bg-white h-20 md:w-60 w-40 py-2 px-2 rounded-lg shadow-lg flex flex-row gap-2 items-center"
          >
            <div
              className={`bg-${content.color} p-2 rounded-full shadow-lg text-white`}
            >
              {content.icon}
            </div>
            <div>
              <h1 className="text-[#1A365D] font-semibold font-poppins">
                {content.title}
              </h1>
              <p className="text-black font-bold text-[18px]">
                {content.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[90%] my-4 py-2 px-2 flex flex-col items-center bg-white rounded-lg">
        <MapComponentDashboard />
      </div>
      {/* other sections overview */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Row - Database and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Database Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 pb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Project Database
              </h2>
              <button
                onClick={() => setIsActive("Database")}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project ID
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
                  {projectDatabase.slice(0, 5).map((data, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 "
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
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {notifications.slice(0, 4).map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg text-blue-600">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Reports and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reports Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Generate Reports
            </h2>
            <div className="space-y-4">
              {[
                "Project Summary Report",
                "Geological Report",
                "Drilling Report",
                "Installation & Discharge Report",
                "Media & GPS Report",
                "Monthly Work Log",
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    {report}
                  </span>
                  <Download className="w-4 h-4 ml-auto text-gray-400 hover:text-blue-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Project Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  STATUS BREAKDOWN
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Completed", color: "bg-green-500" },
                    { label: "Ongoing", color: "bg-blue-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${item.color} mr-2`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-64">
                <Doughnut
                  data={{
                    labels: chartData.map((data) => data.label),
                    datasets: [
                      {
                        data: chartData.map((data) => data.value),
                        backgroundColor: [
                          "rgba(16, 185, 129, 0.8)", // green
                          "rgba(59, 130, 246, 0.8)", // yellow
                        ],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    cutout: "70%",
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default UserDashboardHome;
