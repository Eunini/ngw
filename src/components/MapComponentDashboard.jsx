import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import Projects from "../data/projectsAndStates.json";

delete L.Icon.Default.prototype._getIconUrl;

console.log(Projects);

const getDotIcon = (color) =>
  L.divIcon({
    className: "",
    html: `<div style="width:12px;height:12px;background:${color};border-radius:50%;border:2px solid white;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

function MapComponentDashboard() {
  const [states, setStates] = useState([]);
  const [LGAs, setLGAs] = useState([]);
  const [userState, setUserState] = useState("");
  const [userLGA, setUserLGA] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch all states
  useEffect(() => {
    fetch("https://nga-states-lga.onrender.com/fetch")
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  // Fetch LGAs when state is selected
  useEffect(() => {
    if (!userState) return;
    fetch(`https://nga-states-lga.onrender.com/?state=${userState}`)
      .then((res) => res.json())
      .then((data) => setLGAs(data))
      .catch((error) => console.log("Error fetching LGAs:", error));
  }, [userState]);

  const handleStateChange = (e) => {
    setUserState(e.target.value);
    setUserLGA(""); // reset LGA when state changes
  };

  const handleLGAChange = (e) => setUserLGA(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);

  // const Projects = [
  //   {
  //     id: 1,
  //     status: "completed",
  //     position: [7.3775, 3.947],
  //     state: "Oyo",
  //     lga: "Ibadan North",
  //   },
  //   {
  //     id: 2,
  //     status: "ongoing",
  //     position: [7.3905, 3.9336],
  //     state: "Oyo",
  //     lga: "Ibadan South-West",
  //   },
  //   {
  //     id: 3,
  //     status: "completed",
  //     position: [6.5244, 3.3792],
  //     state: "Lagos",
  //     lga: "Ikeja",
  //   },
  // ];

  const filteredProjects = Projects.filter((p) => {
    return (
      (!userState || p.state === userState) &&
      (!userLGA || p.lga === userLGA) &&
      (!statusFilter || p.status === statusFilter)
    );
  });

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-black font-bold text-[16px]">
          Geographical Overview
        </h1>
        <p className="text-[14px] ">Filter:</p>
      </div>
      <div className="flex flex-row gap-4 flex-wrap w-full">
        <div className="flex flex-col gap-2 w-40">
          <p className="text-[14px]">By states</p>
          <select
            name="state"
            id="statefilter"
            onChange={handleStateChange}
            value={userState}
            className="border-1 border-black rounded-lg p-2"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-40">
          <p className="text-[14px]">By local Government</p>
          <select
            name="lga"
            id="lgafilter"
            value={userLGA}
            onChange={handleLGAChange}
            className="border-1 border-black rounded-lg p-2"
            disabled={!userState}
          >
            <option value="">Select LGA</option>
            {LGAs.map((lga, index) => (
              <option key={index} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-40">
          <p className="text-[14px]">By Project Status</p>
          <select
            name="status"
            id="statusfilter"
            value={statusFilter}
            onChange={handleStatusChange}
            className="border-1 border-black rounded-lg p-2"
          >
            <option value="">Select Project Status</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>
      </div>
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={6}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution="&copy; OpenStreetMap contributors"
        />
        {filteredProjects.map((project) => (
          <Marker
            key={project.id}
            position={project.position}
            icon={
              project.status === "completed"
                ? getDotIcon("blue")
                : getDotIcon("green")
            }
          >
            <Popup>Status: {project.status}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponentDashboard;
