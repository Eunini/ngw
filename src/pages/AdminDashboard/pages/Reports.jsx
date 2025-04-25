/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { CalendarIcon, EyeIcon, DownloadIcon, RotateCwIcon, FileTextIcon, DropletIcon, HardHatIcon } from 'lucide-react';
// import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const projectStatusOptions = ['Ongoing', 'Completed'];
const projectTypeOptions = ['Water', 'Drilling'];
const stateOptions = ['Lagos', 'Kano', 'Abuja'];
const userRoleOptions = ['Admin', 'Field Agent'];

const reports = [
  {
    id: 1,
    title: 'Project Summary Report',
    description: 'Overview of individual project details with GPS, media and status',
    tags: ['Projects'],
    type: 'PDF',
    date: '2024-01-15',
    status: 'Complete',
    icon: <FileTextIcon className="text-blue-500 text-md" />,
  },
  {
    id: 2,
    title: 'Water Point Status Report',
    description: 'Current status and performance metrics of water points',
    tags: ['Status', 'Performance'],
    type: 'Excel',
    date: '2024-01-10',
    status: 'Complete',
    icon: <DropletIcon className="text-blue-500 text-md" />,
  },
  {
    id: 3,
    title: 'Drilling Performance Report',
    description: 'Analysis of drilling operations and success rates',
    tags: ['Operations'],
    type: 'PDF',
    date: '2024-01-05',
    status: 'Complete',
    icon: <HardHatIcon className="text-blue-500 text-md" />,
  },
];

export default function ReportCenter() {
  const [filters, setFilters] = useState({
    status: 'All',
    type: 'All',
    state: 'All',
    role: 'All',
    dateFrom: '',
    dateTo: '',
  });

  const handleChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  const filteredReports = reports.filter(report => {
    return true;
  });

  const handleExport = format => {
    const from = filters.dateFrom ? formatDate(filters.dateFrom) : 'All';
    const to = filters.dateTo ? formatDate(filters.dateTo) : 'All';
    const message = `Exporting ${format.toUpperCase()} report for ${filters.state} - ${filters.status} - ${filters.type} (${from} to ${to})`;
    alert(message);
  };

  const formatDate = date => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const handleDownload = (report) => {
    alert(`Downloading ${report.title} as ${report.type} file`);
    // Actual implementation would be:
    // const link = document.createElement('a');
    // link.href = `/api/reports/${report.id}/download?format=${report.type.toLowerCase()}`;
    // link.download = `${report.title.replace(/\s+/g, '_')}.${report.type.toLowerCase()}`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Report Center</h1>
        <div className="flex items-center gap-2">
          <Input type="date" />
          <Button onClick={() => handleExport('pdf')}>PDF</Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>Excel</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <select 
          className="p-2 rounded shadow-xs bg-white outline-0" 
          onChange={e => handleChange('status', e.target.value)}
          value={filters.status}
        >
          <option value="All">Project Status</option>
          {projectStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <select 
          className="p-2 rounded shadow-xs bg-white outline-0" 
          onChange={e => handleChange('type', e.target.value)}
          value={filters.type}
        >
          <option value="All">Project Type</option>
          {projectTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <select 
          className="p-2 rounded shadow-xs bg-white outline-0" 
          onChange={e => handleChange('state', e.target.value)}
          value={filters.state}
        >
          <option value="All">State</option>
          {stateOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <select 
          className="p-2 rounded shadow-xs bg-white outline-0" 
          onChange={e => handleChange('role', e.target.value)}
          value={filters.role}
        >
          <option value="All">User Role</option>
          {userRoleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <Input 
          type="date" 
          placeholder="From" 
          onChange={e => handleChange('dateFrom', e.target.value)} 
          value={filters.dateFrom}
          className='rounded shadow-xs bg-white outline-0 border-0'
        />
        <Input 
          type="date" 
          placeholder="To" 
          onChange={e => handleChange('dateTo', e.target.value)} 
          value={filters.dateTo}
          className='rounded shadow-xs bg-white outline-0 border-0'
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col justify-start items-start gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-full">
                  {report.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {report.tags.map(tag => (
                  <span key={tag} className="text-xs bg-[#E5F0FF] text-blue-500 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <Link to={`/reports/${report.id}`}><Button className="w-full">View Report</Button></Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className=' bg-white p-3'>
        <h2 className="text-xl font-semibold mb-3  p-3">Recent Reports</h2>
        <div className="overflow-x-auto rounded-lg ">
          <table className="min-w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="px-4 py-2">Report Name</th>
                <th className="px-4 py-2">Generated Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t border-gray-100">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <div className="p-1 bg-blue-50 rounded-full">
                      {report.icon}
                    </div>
                    {report.title}
                  </td>
                  <td className="px-4 py-2">{report.date}</td>
                  <td className="px-4 py-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{report.type}</span>
                  </td>
                  <td className="px-4 py-2">{report.status}</td>
                  <td className="px-4 py-2 space-x-2 text-blue-600 flex items-center">
                    <Link to={`/reports/${report.id}`}><EyeIcon size={16} /></Link>
                    <button onClick={() => handleDownload(report)}>
                      <DownloadIcon size={16} />
                    </button>
                    <button><RotateCwIcon size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}