import {
  Home,
  Database,
  NetworkIcon,
  FileText,
  Settings,
  LogOut,
  PlusCircle,
  MessageCircle
} from "lucide-react";
import { useActiveTab } from "./ActiveTabContext";
import { useNavigate } from "react-router-dom";
import { userData } from "../pages/UserDashboard";
import { icon } from "leaflet";


function SideNav() {
  const { isActive, setIsActive } = useActiveTab();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: Home },
    { name: "New Entry", icon: PlusCircle },
    { name: "Projects", icon: NetworkIcon },
    { name: "Reports", icon: FileText },
    {name: "Feedback", icon:  MessageCircle},
    { name: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <section className="hidden md:flex bg-[#1A365D] flex-col fixed h-screen w-64 pt-8 items-center z-40">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="px-2 bg-white rounded-full"
        >
          <img src="/logo.png" alt="logo" className="w-12 h-16 object-fit" />
        </div>

        <div className="bg-white w-[70%] h-[1px] my-6"></div>

        {/* User Profile */}
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="w-14 h-14">
            <img
              src={userData.map((data) => data.profile_pic)}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-bold font-poppins text-[16px]">
              {userData.map((data) => data.userName)}
            </h1>
            <p className="text-white font-openSans text-[12px]">
            {userData.map((data) => data.specialization)}
            </p>
          </div>
        </div>

        <div className="bg-white w-[70%] h-[1px] my-6"></div>

        {/* Nav Items */}
        {navItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`py-3 flex flex-row items-center font-semibold cursor-pointer w-full pl-8 gap-8 ${
              isActive === name
                ? "text-white bg-[#2B4C7E] border-l-2 border-orange-200"
                : "text-white"
            }`}
            onClick={() => setIsActive(name)}
          >
            <Icon
              className={`w-4 h-4 ${
                isActive === name ? "text-orange-200" : "text-white"
              }`}
            />
            <p className="md:text-[16px] text-[12px]">{name}</p>
          </button>
        ))}

        {/* Log Out  - Logout fixed for demo user - logic should be fixed later*/}
        <button
          onClick={() => navigate("/login")}
          className="mt-8 hover:text-orange-200 text-white md:text-[16px] text-[12px] flex flex-row items-center w-full cursor-pointer font-semibold pl-8 gap-8"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </section>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A365D] z-40 flex justify-around py-2 shadow-inner">
        {navItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setIsActive(name)}
            className={`flex flex-col items-center justify-center ${
              isActive === name ? "text-orange-200" : "text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </>
  );
}

export default SideNav;
