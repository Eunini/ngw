import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import nigeriaData from '../components/data/nigeriaData.json';

// Fix for default marker icons
const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom marker icons
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const getIcon = (projectType) => {
  switch(projectType) {
    case "Boreholes": return createCustomIcon("blue");
    case "Wells": return createCustomIcon("green");
    case "Water Treatment": return createCustomIcon("gold");
    default: return createCustomIcon("red");
  }
};

const NigeriaProjectsMap = () => {
  const [states, setStates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: "All",
    lga: "All",
    status: "All"
  });

  // Load data from local JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStates(nigeriaData.states);
        const generatedProjects = generateMockProjects(nigeriaData.states);
        setProjects(generatedProjects);
        
        // Extract unique LGAs for the selected state
        const lgaOptions = {};
        nigeriaData.states.forEach(state => {
          lgaOptions[state.name] = state.lgas;
        });
        setLgas(lgaOptions);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Generate mock projects for demonstration
  const generateMockProjects = (states) => {
    const projectTypes = ["Boreholes", "Wells", "Water Treatment"];
    const statuses = ["Completed", "In Progress", "Planned"];
    
    return states.flatMap(state => {
      return state.lgas.flatMap(lga => {
        return projectTypes.map(type => {
          // Add some random variation to coordinates
          const randomOffset = () => (Math.random() * 0.5 - 0.25);
          
          return {
            state: state.name,
            lga,
            type,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            count: Math.floor(Math.random() * 20) + 1,
            coordinates: [
              state.latitude + randomOffset(), 
              state.longitude + randomOffset()
            ]
          };
        });
      });
    });
  };

  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    return (
      (filters.state === "All" || project.state === filters.state) &&
      (filters.lga === "All" || project.lga === filters.lga) &&
      (filters.status === "All" || project.status === filters.status)
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { lga: "All" } : {}) // Reset LGA when state changes
    }));
  };

  // Get LGAs for selected state
  const getLGAsForState = () => {
    if (filters.state === "All") return ["All"];
    return ["All", ...(lgas[filters.state] || [])];
  };

  // Center map on selected state
  const getMapCenter = () => {
    if (filters.state === "All") return [9.0820, 8.6753]; // Nigeria center
    const state = states.find(s => s.name === filters.state);
    return state ? [state.latitude, state.longitude] : [9.0820, 8.6753];
  };

  // Preloader component
  const Preloader = () => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 rounded-lg">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-green-500 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
        <div className="absolute inset-4 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin animation-delay-400"></div>
      </div>
      <p className="text-lg font-medium text-gray-700">Loading Map Data...</p>
      <p className="text-sm text-gray-500 mt-2">Please wait while we prepare your map</p>
    </div>
  );

  return (
    <div className="relative z-0 h-[300px] md:h-[420px] flex flex-col">
      {/* Filter Controls */}
      <div className="bg-white p-2 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            disabled={loading}
          >
            <option value="All">All States</option>
            {states.map(state => (
              <option key={state.name} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local Government</label>
          <select
            name="lga"
            value={filters.lga}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            disabled={filters.state === "All" || loading}
          >
            {getLGAsForState().map(lga => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            disabled={loading}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">Ongoing</option>
          </select>
        </div>
      </div>

      {/* Map Container - Made larger */}
      <div className="flex-1 h-[90vh] md:h-[70vh] w-full rounded-lg overflow-hidden ">
        {loading ? (
          <Preloader />
        ) : (
          <MapContainer 
            center={getMapCenter()} 
            zoom={filters.state === "All" ? 5.5 : 8}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredProjects.map((project, idx) => (
              <Marker 
                key={idx} 
                position={project.coordinates}
                icon={getIcon(project.type)}
              >
                <Popup className="text-sm min-w-[200px]">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base">{project.state} - {project.lga}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold">Type:</p>
                        <p>{project.type}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Count:</p>
                        <p>{project.count}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Status:</p>
                        <p className={`${
                          project.status === "Completed" ? 'text-green-600' :
                          project.status === "In Progress" ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}>
                          {project.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>      
    </div>
  );
};

export default NigeriaProjectsMap;