import React from 'react';
import { FaMapMarkerAlt, FaDatabase, FaTint, FaUser, FaSearch } from 'react-icons/fa';
import WaterAccessibilityChart from '../components/WaterAccessibilityChart';
import NigeriaProjectsMap from '../components/NigeriaProjectsMap';
import SuccessRateChart from '../components/SuccessRateChart';
import BoreholesLineChart from '../components/BoreholesLineChart';

const AdminDashboard = () => {
  // Calculate values dynamically
  const hydrogeologists = 24;
  const engineers = 89;
  const contractors = 400;
  const driller = 200;
  const drilling_company = 120;
  const totalUsers = hydrogeologists + engineers + contractors + driller + drilling_company;
  
  const activeProjects = 295;
  const completedProjects = 18;
  const totalProjects = activeProjects + completedProjects;

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
  {[
    { 
      title: 'USERS', 
      icon: <FaDatabase />, 
      value: totalUsers.toString(),
      subItems: [
        { label: 'Hydrogeologists', value: hydrogeologists.toString() },
        { label: 'Civil/Water', value: engineers.toString() },
        { label: 'Drillers', value: driller.toString() },
        { label: 'Contractor', value: contractors.toString() },
        { label: 'Drilling Company', value: drilling_company.toString() }
      ],
      bgColor: '#3B82F6' 
    },
    { 
      title: 'TOTAL PROJECTS', 
      icon: <FaTint />, 
      value: totalProjects.toString(), 
      bgColor: '#06B6D4' 
    },
    { 
      title: 'ONGOING PROJECTS', 
      icon: <FaUser />, 
      value: activeProjects.toString(), 
      bgColor: '#6366F1' 
    },
    { 
      title: 'COMPLETED PROJECTS', 
      icon: <FaMapMarkerAlt />, 
      value: completedProjects.toString(), 
      bgColor: '#EF4444' 
    },
  ].map((item, index) => (
    <div 
      key={index} 
      className={`bg-white p-4 rounded-lg shadow-sm flex ${
        index === 0 ? 'flex flex-row sm:items-start' : 'flex-row items-center'
      } gap-4`}
    >
      <div 
        className={`text-white p-3 rounded-full flex-shrink-0 ${
          index === 0 ? 'self-center sm:self-start' : ''
        }`}
        style={{ backgroundColor: item.bgColor }}
      >
        {item.icon}
      </div>
      <div className="flex items-start">
        <div className="flex flex-col ">
            <h2 className="text-sm text-gray-500">{item.title}</h2>
            <p className="text-xl font-bold">{item.value}</p>
        </div>
        
        {/* Sub-items for USERS card */}
        {index === 0 && item.subItems && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 ml-4">
            {item.subItems.map((subItem, subIndex) => (
              <div key={subIndex} className="text-xs whitespace-nowrap">
                <span className="text-gray-500">{subItem.label}: </span>
                <span className="font-medium">{subItem.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ))}
</div>

      {/* Map */}
      <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm mt-4">
        <div className="md:flex-row flex flex-col justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700">Projects by State</h3>
        </div>
        <div className="h-75 w-full rounded-md overflow-hidden bg-gray-200">
          <NigeriaProjectsMap/>
        </div>
      </div>

      {/* Analytics section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 text-2xl mb-2">Success Rate</h3>
          <div className="text-blue-600 text-2xl font-bold">74%</div>
          <div className="mt-2 h-40">
            <SuccessRateChart />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm md:mt-10">
          <h3 className="font-semibold text-gray-600 text-2xl">Accessibility Rate</h3>
          <p className="text-lg font-semibold">7.9 months</p>
          <div className="mt-2 h-40">
            <WaterAccessibilityChart />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Monthly Progress</h3>
          <BoreholesLineChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;