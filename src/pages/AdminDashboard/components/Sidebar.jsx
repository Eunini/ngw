import {
    FaTachometerAlt,
    FaMapMarkedAlt,
    FaFolderOpen,
    FaFileAlt,
    FaTools,
    FaUserCircle,
    FaUsers,
    FaShieldAlt,
    FaCog,
    FaSignOutAlt,
  } from "react-icons/fa";
  import { NavLink } from "react-router-dom";
  
  const links = [
    { name: "Dashboard", icon: <FaTachometerAlt />, to: "/admin" },
    { name: "Projects", icon: <FaFolderOpen />, to: "/admin/projects" },
    { name: "Users", icon: <FaUserCircle />, to: "/admin/users" },
    { name: "Reports", icon: <FaFileAlt />, to: "/admin/Reports" },
    { name: "Analytics", icon: <FaFileAlt />, to: "/admin/Analytics" },
    { name: "Map View", icon: <FaMapMarkedAlt />, to: "/admin/AdminMap" },
    { name: "Access Control", icon: <FaTools />, to: "/admin/access-control" },
    { name: "Feedback & Community", icon: <FaUsers />, to: "/admin/feedback" },
    { name: "Settings", icon: <FaCog />, to: "/admin/settings" },
    // { name: "Logout", icon: <FaSignOutAlt />, to: "/admin/logout" },
    { name: "Logout", icon: <FaSignOutAlt />, to: "/login" },
  ];
  
  const Sidebar = () => {
    return (
      <>
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-200 shadow-md z-40">
        <div className="flex px-4 py-6 items-center gap-2 flex-shrink-0">
        <img src="/logo.png" alt="logo" className="w-10 h-15"/>
          <h1 className="text-lg font-semibold whitespace-nowrap hidden sm:inline">
            WaterTrac Pro
          </h1>
        </div>
          <nav className="flex-1 overflow-auto px-2 py-4 space-y-2">
            {links.map((link) => (
              <NavLink
                to={link.to}
                key={link.name}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-700"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>
        </aside>
  
        {/* Mobile bottom nav with 4 selected items */}
        <nav className="w-full md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-inner flex justify-between px-4 py-2">
          {[
            links[0], // Dashboard
            links[2], // Projects
            links[4], // Maintenance
            links[7], // Settings
          ].map((link) => (
            <NavLink
              to={link.to}
              key={link.name}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs font-medium ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`
              }
            >
              <div className="text-lg">{link.icon}</div>
              <span className="mt-1">{link.name.split(" ")[0]}</span>
            </NavLink>
          ))}
        </nav>
      </>
    );
  };
  
  export default Sidebar;
  