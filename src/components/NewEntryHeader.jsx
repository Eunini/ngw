// import {
//   ChevronLeft,
//   PlusCircle,
//   Database,
//   FileText,
//   BarChart,
//   Bell,
//   UserCircle,
//   Save,
// } from "lucide-react";
// import { useSelectedTab } from "./SelectedItemProvider";
// import { userData } from "../pages/Dashboard";
// import { useNavigate } from "react-router-dom";

// const tabOptions = [
//   { option: "New Entry", icon: PlusCircle },
//   { option: "View Database", icon: Database },
//   { option: "Reports", icon: FileText },
//   { option: "Analytics", icon: BarChart },
// ];

// function NewEntryHeader() {
//   const { isActive, setIsActive } = useSelectedTab();
//   const navigate = useNavigate();

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between fixed w-full z-50">
//       {/* Mobile Header */}
//       <div className="flex items-center md:hidden w-full justify-between">
//         <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
//           <ChevronLeft className="text-gray-700 w-6 h-6" />
//         </button>
//         <h1 className="text-lg font-semibold text-gray-800">New Entry</h1>
//         <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
//           <Save className="text-gray-700 w-6 h-6" />
//         </button>
//       </div>

//       {/* Desktop Header */}
//       <div className="hidden md:flex items-center space-x-8">
//         <div className="flex items-center">
//           <img src="/logo.png" alt="logo" className="w-10 h-12" />
//         </div>

//         <nav className="flex space-x-1">
//           {tabOptions.map(({ option, icon: Icon }, index) => {
//             const tabId = option.toLowerCase().replace(/\s+/g, "");
//             const isActiveTab = isActive === tabId;

//             return (
//               <button
//                 key={index}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
//                   isActiveTab
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`}
//                 onClick={() => setIsActive(tabId)}
//               >
//                 <Icon
//                   className={`w-5 h-5 ${
//                     isActiveTab && option === "View Database"
//                       ? "fill-blue-600"
//                       : ""
//                   }`}
//                   fill={
//                     isActiveTab && option === "View Database"
//                       ? "currentColor"
//                       : "none"
//                   }
//                 />
//                 <span className="text-sm font-medium">{option}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       <div className="hidden md:flex items-center space-x-4">
//         <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors relative">
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>

//         <div
//           className="flex items-center space-x-2 cursor-pointer group"
//           onClick={() => navigate("/dashboard")}
//         >
//           <div className="relative">
//             <UserCircle className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors" />
//             <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
//           </div>
//           <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors hidden lg:block">
//             {userData.map((data) => data.userName)}
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default NewEntryHeader;
