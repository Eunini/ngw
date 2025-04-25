/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFileExport, 
  FaChevronLeft, 
  FaChevronRight,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { 
  BsThreeDotsVertical,
  BsFilter
} from 'react-icons/bs';
import { 
  AiOutlineClose,
  AiOutlineExclamationCircle
} from 'react-icons/ai';
import { 
  HiOutlineDocumentReport 
} from 'react-icons/hi';
import { 
  TbReport 
} from 'react-icons/tb';

const data = [
    {
      id: 1,
      project: 'Central Water Facility',
      reporterName: 'Sarah Johnson',
      reporterType: 'Community Member',
      reporterEmail: 'sarah@gmail.com',
      reporterPhone: '(555) 123-4567',
      issueType: 'Water Leak',
      issueDetails: 'Significant water leak observed near the main pipeline junction. Water is continuously flowing and creating a pool in the surrounding area.',
      dateSubmitted: '2024-01-15',
      status: 'New',
      projectStatus: 'Active',
      media: [1, 2, 3, 4],
      location: 'GPS: 9.0765° N, 7.3986° E' // Lagos coordinates
    },
    {
      id: 2,
      project: 'North District Pipeline',
      reporterName: 'Mike Chen',
      reporterType: 'Field Engineer',
      reporterEmail: 'mike@gmail.com',
      reporterPhone: '(555) 234-5678',
      issueType: 'Contamination',
      issueDetails: 'Possible chemical contamination detected in water samples from the north district pipeline.',
      dateSubmitted: '2024-01-14',
      status: 'Under Review',
      projectStatus: 'Active',
      media: [1, 2],
      location: 'GPS: 12.0022° N, 8.5136° E' // Kano coordinates
    },
    {
      id: 3,
      project: 'South Region Plant',
      reporterName: 'Emma Davis',
      reporterType: 'Professional',
      reporterEmail: 'emma@gmail.com',
      reporterPhone: '(555) 345-6789',
      issueType: 'No Water',
      issueDetails: 'Complete water outage reported in the south region. Residents have been without water for 12 hours.',
      dateSubmitted: '2024-01-13',
      status: 'Resolved',
      projectStatus: 'Completed',
      media: [1],
      location: 'GPS: 5.1477° N, 7.3619° E' // Aba coordinates
    },
    {
      id: 4,
      project: 'West Area Network',
      reporterName: 'James Wilson',
      reporterType: 'Community Member',
      reporterEmail: 'james@gmail.com',
      reporterPhone: '(555) 456-7890',
      issueType: 'Water Leak',
      issueDetails: 'Minor leak detected in the west area network. Small puddle forming but not yet causing damage.',
      dateSubmitted: '2024-01-12',
      status: 'Escalated',
      projectStatus: 'Active',
      media: [1, 2, 3],
      location: 'GPS: 6.5244° N, 3.3792° E' 
    },
  ];

const statusColor = {
  'New': 'bg-blue-100 text-blue-700',
  'Under Review': 'bg-yellow-100 text-yellow-700',
  'Resolved': 'bg-green-100 text-green-700',
  'Escalated': 'bg-red-100 text-red-700',
};

const projectStatusColor = {
  'Active': 'text-green-600',
  'Completed': 'text-gray-600',
  'On Hold': 'text-yellow-600'
};

export default function Feedback() {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    reporterType: '',
    issueType: '',
    status: '',
    dateRange: ''
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get unique values for filter options
  const reporterTypes = [...new Set(data.map(item => item.reporterType))];
  const issueTypes = [...new Set(data.map(item => item.issueType))];
  const statuses = [...new Set(data.map(item => item.status))];

  // Filter data based on search and filters
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.project.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (filters.reporterType === '' || item.reporterType === filters.reporterType) &&
      (filters.issueType === '' || item.issueType === filters.issueType) &&
      (filters.status === '' || item.status === filters.status);
    
    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      reporterType: '',
      issueType: '',
      status: '',
      dateRange: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Feedback Center</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 rounded-md text-sm text-blue-700 hover:bg-blue-500 hover:text-white">
          <FaFileExport className='text-blue-500 hover:text-white'/> Export Data
        </button>
      </div>

      {/* Mobile Filter Button */}
      <button 
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="md:hidden flex items-center gap-2 mb-4 px-3 py-2 bg-white border-0 outline-0 rounded-md shadow-sm"
      >
        <BsFilter /> Filters
      </button>

      {/* Filters - Desktop */}
      <div className={`hidden md:flex flex-col md:flex-row gap-4 md:items-center mb-4`}>
        <div className="flex items-center gap-2 border-0 outline-0 rounded-md px-3 py-2 bg-white shadow-sm w-full md:w-1/3">
          <FaSearch className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by project or reporter name" 
            className="w-full focus:outline-none" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border-0 outline-0 shadow-md p-2 rounded-md w-full md:w-auto"
          value={filters.reporterType}
          onChange={(e) => handleFilterChange('reporterType', e.target.value)}
        >
          <option value="">All Reporter Types</option>
          {reporterTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
        <select 
          className="border-0 outline-0 shadow-md p-2 rounded-md w-full md:w-auto"
          value={filters.issueType}
          onChange={(e) => handleFilterChange('issueType', e.target.value)}
        >
          <option value="">All Issue Types</option>
          {issueTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
        <select 
          className="border-0 outline-0 shadow-md p-2 rounded-md w-full md:w-auto"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map((status, idx) => (
            <option key={idx} value={status}>{status}</option>
          ))}
        </select>
        <button 
          onClick={resetFilters}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Filters - Mobile */}
      {showMobileFilters && (
        <div className="md:hidden bg-white p-4 rounded-md shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Filters</h3>
            <button onClick={() => setShowMobileFilters(false)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Search</label>
              <div className="flex items-center gap-2 border-0 outline-0 rounded-md px-3 py-2 bg-white shadow-sm">
                <FaSearch className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full focus:outline-none" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Reporter Type</label>
              <select 
                className="border p-2 rounded-md w-full"
                value={filters.reporterType}
                onChange={(e) => handleFilterChange('reporterType', e.target.value)}
              >
                <option value="">All Reporter Types</option>
                {reporterTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Issue Type</label>
              <select 
                className="border p-2 rounded-md w-full"
                value={filters.issueType}
                onChange={(e) => handleFilterChange('issueType', e.target.value)}
              >
                <option value="">All Issue Types</option>
                {issueTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select 
                className="border p-2 rounded-md w-full"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                {statuses.map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={resetFilters}
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 border rounded-md"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow-sm">
          <thead className=" text-gray-600 text-left text-sm">
            <tr>
              <th className="p-3 font-medium">Project</th>
              <th className="p-3 font-medium">Reporter</th>
              <th className="p-3 font-medium hidden md:table-cell">Type</th>
              <th className="p-3 font-medium">Issue</th>
              <th className="p-3 font-medium hidden md:table-cell">Date</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3">{item.project}</td>
                  <td className="p-3">
                    <div className="md:hidden flex flex-col">
                      <span>{item.reporterName}</span>
                      <span className="text-xs text-gray-500">{item.reporterType}</span>
                    </div>
                    <span className="hidden md:inline">{item.reporterName}</span>
                  </td>
                  <td className="p-3 hidden md:table-cell">{item.reporterType}</td>
                  <td className="p-3 flex items-center gap-1">
                    {item.issueType === 'Water Leak' && <span className="text-blue-500"><AiOutlineExclamationCircle /></span>}
                    {item.issueType === 'Contamination' && <span className="text-yellow-500"><AiOutlineExclamationCircle /></span>}
                    {item.issueType === 'No Water' && <span className="text-red-500"><AiOutlineExclamationCircle /></span>}
                    <span className="md:hidden">{item.issueType.substring(0, 10)}{item.issueType.length > 10 ? '...' : ''}</span>
                    <span className="hidden md:inline">{item.issueType}</span>
                  </td>
                  <td className="p-3 hidden md:table-cell">{item.dateSubmitted}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => setSelected(item)} 
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No feedback found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-600 gap-4">
          <span>Showing 1 to {filteredData.length} of {filteredData.length} entries</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 border rounded-md flex items-center gap-1">
              <FaChevronLeft size={12} /> Previous
            </button>
            {[1].map(num => (
              <button key={num} className={`px-2 py-1 border rounded-md ${num === 1 ? 'bg-blue-100 text-blue-600' : ''}`}>
                {num}
              </button>
            ))}
            <button className="px-2 py-1 border rounded-md flex items-center gap-1">
              Next <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Feedback Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Feedback Details</h3>
              <button 
                onClick={() => setSelected(null)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  Project Information
                </h4>
                <div className='flex justify-start'>
                    <span><FaMapMarkerAlt className='m-3 text-gray-500'/></span>
                    <div>
                        <p className="text-md text-gray-700 font-semibold">   {selected.project}</p>
                        <p className="text-xs text-gray-500 flex">   {selected.location}</p>
                    </div>
                </div>
                <div className='flex justify-start items-center'>
                  <FaCheckCircle className="inline m-3 text-md text-blue-500" /> 
                  <span className="text-gray-700 font-semibold pr-2 text-md">Project Status:</span>
                  <span className="text-gray-500 text-sm">{selected.projectStatus}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-600 mb-2 flex items-center gap-2">
                   Reporter Information
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="text-sm flex items-center">
                    <FaUser className="text-gray-400 mr-3 text-xl" /> 
                    <div className="flex flex-col">
                        <span className="text-gray-700 font-semibold text-md">{selected.reporterName}</span>
                        <span className='text-gray-500 text-sm'>Community Member</span>
                    </div>
                  </div>
                  <p className="text-sm flex items-center gap-2">
                    <FaEnvelope className="text-gray-400 mr-3" /> {selected.reporterEmail}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaPhone className="text-gray-400 mr-3" /> {selected.reporterPhone}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-600 mb-2 flex items-center gap-2">
                Issue Details
                </h4>
                <div className="ml-6">
                  <p className="text-md mb-1">
                    {selected.issueType === 'Water Leak' && <span className="text-blue-500"><AiOutlineExclamationCircle className="inline mr-1 text-md" /></span>}
                    {selected.issueType === 'Contamination' && <span className="text-yellow-500"><AiOutlineExclamationCircle className="inline mr-1 text-md" /></span>}
                    {selected.issueType === 'No Water' && <span className="text-red-500"><AiOutlineExclamationCircle className="inline mr-1 text-md" /></span>}
                    {selected.issueType}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{selected.issueDetails}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <FaCalendarAlt /> Submitted on {selected.dateSubmitted}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-600 mb-2 flex items-center gap-2">Uploaded Media</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selected.media.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={`https://source.unsplash.com/300x300/?water,${selected.issueType.toLowerCase().replace(' ', '')}&sig=${selected.id}${idx}`} 
                      alt="media" 
                      className="rounded-md w-full h-24 object-cover" 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setSelected(null)}
                className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-md text-sm text-white hover:bg-blue-700">
                Take Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}