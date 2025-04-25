import { FaTint, FaSearch, FaBell, FaCog } from "react-icons/fa";

const Header = () => {
  return (
    <div className="fixed top-0 md:left-60 left-0 right-0 bg-white z-30 shadow-md">
       <div className="flex items-center justify-between px-4 py-3 mx-auto w-full max-w-screen-xl">
        {/* Left: Logo section */}
        <div className="flex items-center gap-2 flex-shrink-0">
        <img src="/logo.png" alt="logo" className="w-10 h-15"/>
          <h1 className="text-lg font-semibold whitespace-nowrap hidden sm:inline">
            ADMIN DASHBOARD
          </h1>
        </div>

        {/* Center: Search */}
        <div className="relative w-full max-w-[180px] sm:max-w-[250px] md:max-w-md">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-3 p-2 flex-shrink-0 text-gray-600">
          <FaBell className="text-xl cursor-pointer" />
          <FaCog className="text-xl cursor-pointer" />
          <img
            src="https://i.pravatar.cc/30"
            alt="avatar"
            className="rounded-full w-8 h-8 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
