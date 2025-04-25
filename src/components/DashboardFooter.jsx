// import { Home, Database, NetworkIcon, FileText, Settings } from "lucide-react";
// import { useState } from "react";
// import { useActiveTab } from "./ActiveTabContext";

// function DashboardFooter() {
//   const {isActive, setIsActive} = useActiveTab();

//   return (
//     <section className="bg-white flex flex-row md:justify-around justify-between px-2 md:gap-8 gap-4 items-center py-2 fixed bottom-0 w-full z-10">
//       <div
//         className={`flex flex-col items-center cursor-pointer ${
//           isActive === "Home" ? "text-[#1A365D]" : "text-[#9CA3AF]"
//         }`}
//         onClick={() => setIsActive("Home")}
//       >
//         <Home className="md:w-10 md:h-12" />
//         <p className="md:text-[16px] text-[12px]">Home</p>
//       </div>
//       <div
//         className={`flex flex-col items-center cursor-pointer ${
//           isActive === "Database" ? "text-[#1A365D]" : "text-[#9CA3AF]"
//         }`}
//         onClick={() => setIsActive("Database")}
//       >
//         <Database className="md:w-10 md:h-12" />
//         <p className="md:text-[16px] text-[12px]">Database</p>
//       </div>
//       <div
//         className={`flex flex-col items-center cursor-pointer ${
//           isActive === "Projects" ? "text-[#1A365D]" : "text-[#9CA3AF]"
//         }`}
//         onClick={() => setIsActive("Projects")}
//       >
//         <NetworkIcon className="md:w-10 md:h-12" />
//         <p className="md:text-[16px] text-[12px]">Projects</p>
//       </div>
//       <div
//         className={`flex flex-col items-center cursor-pointer ${
//           isActive === "Reports" ? "text-[#1A365D]" : "text-[#9CA3AF]"
//         }`}
//         onClick={() => setIsActive("Reports")}
//       >
//         <FileText className="md:w-10 md:h-12" />
//         <p className="md:text-[16px] text-[12px]">Reports</p>
//       </div>
//       <div
//         className={`flex flex-col items-center cursor-pointer ${
//           isActive === "Settings" ? "text-[#1A365D]" : "text-[#9CA3AF]"
//         }`}
//         onClick={() => setIsActive("Settings")}
//       >
//         <Settings className="md:w-10 md:h-12" />
//         <p className="md:text-[16px] text-[12px]">Settings</p>
//       </div>
//     </section>
//   );
// }

// export default DashboardFooter;
