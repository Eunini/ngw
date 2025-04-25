// import {
//   PlusCircle,
//   LineChart,
//   BarChart,
//   Clock,
//   Database,
//   FileText,
// } from "lucide-react";
// import { userData } from "../pages/Dashboard";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const borehole_info = [
//   { total_boreholes: 234, active_projects: 34, recent_updates: 10 },
// ];

// function DashboardHomeComponent() {
//   // const navigate = useNavigate();
//   return (
//     <div className="w-full flex flex-col items-center pb-6 pt-4">
//       <div className="md:w-[100%] w-[80%] bg-gradient-to-r from-[#1A365D] to-[#2A4A7F] p-4 rounded-2xl my-8">
//         <h1 className="font-bold text-white md:text-[30px] text-[24px] pb-2">
//           Welcome back,{" "}
//           {userData.map((data, index) => (
//             <span key={index}>{data.userName}</span>
//           ))}
//         </h1>
//         <p className="md:text-[20px] text-[16px] text-[#B2C5E3]">
//           Access your borehole data instantly
//         </p>
//         <div className="flex flex-row gap-8">
//           <div className="flex flex-col text-white md:text-[20px] text-[16px] py-4">
//             <h1>Active Projects</h1>
//             <h1>12</h1>
//           </div>
//           <div className="flex flex-col text-white md:text-[20px] text-[16px] py-4">
//             <h1>Recent Updates</h1>
//             <h1>5</h1>
//           </div>
//         </div>
//       </div>
//       {/* component of home */}
//       <div className="w-full flex flex-row flex-wrap items-center justify-center gap-6">
//         {/* boxes in dashboard */}
//         <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
//           <div>
//             <Link to={"/newentry"}>
//               <div
//                 // onClick={() => navigate("/newentry")}
//                 className="bg-white text-left p-4 rounded-lg md:w-50 w-36 mb-4 hover:border hover:border-[#1A365D] cursor-pointer"
//               >
//                 <PlusCircle className="md:w-[36px] md:h-[36px] w-[32px] h-[32px] text-blue-500" />
//                 <h1 className="font-bold md:text-[20px] text-[16px] text-[#1A202C] pt-3">
//                   New Entry
//                 </h1>
//                 <p className="md:text-[18px] text-[14px] text-[#4B5563]">
//                   Add New data
//                 </p>
//               </div>
//             </Link>
//             <div className="bg-white text-left p-4 rounded-lg md:w-50 w-36 mb-4 hover:border hover:border-[#1A365D] cursor-pointer">
//               <LineChart className="md:w-[36px] md:h-[36px] w-[32px] h-[32px] text-[#9F7AEA]" />
//               <h1 className="font-bold md:text-[20px] text-[16px] text-[#1A202C] pt-3">
//                 Analytics
//               </h1>
//               <p className="md:text-[18px] text-[14px] text-[#4B5563]">
//                 View Insights
//               </p>
//             </div>
//           </div>
//           <div>
//             <div className="bg-white text-left p-4 rounded-lg md:w-50 w-36 mb-4 hover:border hover:border-[#1A365D] cursor-pointer">
//               <Database className="md:w-[36px] md:h-[36px] w-[32px] h-[32px] text-white fill-[#48BB78]" />
//               <h1 className="font-bold md:text-[20px] text-[16px] text-[#1A202C] pt-3">
//                 View Database
//               </h1>
//               <p className="md:text-[18px] text-[14px] text-[#4B5563]">
//                 Browse Records
//               </p>
//             </div>
//             <div className="bg-white text-left p-4 rounded-lg md:w-50 w-36 mb-4 hover:border hover:border-[#1A365D] cursor-pointer">
//               <FileText className="md:w-[36px] md:h-[36px] w-[32px] h-[32px] text-[#ED8936]" />
//               <h1 className="font-bold md:text-[20px] text-[16px] text-[#1A202C] pt-3">
//                 Reports
//               </h1>
//               <p className="md:text-[18px] text-[14px] text-[#4B5563]">
//                 Generate Reports
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* recent activities */}
//         <div className="my-8">
//           <h1 className="text-[20px] md:text-[24px] text-[#1A202C] font-semibold">
//             Recent Activities
//           </h1>
//           <div className="space-y-3">
//             {notifications.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md"
//               >
//                 {item.title === "New Borehole Added" && (
//                   <PlusCircle className="text-blue-500" />
//                 )}
//                 {item.title === "Report Generated" && (
//                   <LineChart className="text-blue-500" />
//                 )}
//                 {item.title === "Data Updated" && (
//                   <BarChart className="text-blue-500" />
//                 )}
//                 <div>
//                   <p className="font-semibold md:text-[20px] text-[16px]">
//                     {item.title}
//                   </p>
//                   <p className="text-gray-500 text-[14px] md:text-[18px]">
//                     {item.description}
//                   </p>
//                 </div>
//                 <p className="ml-auto text-gray-400 text-[14px] md:text-[18px] flex items-center">
//                   <Clock className="md:w-[20px] md:h-[20px] w-[16px] h-[16px] mr-1" />{" "}
//                   <span className="md:w-fit w-10 truncate">{item.time}</span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="pb-20">
//         {borehole_info.map((data, index) => (
//           <div key={index} className="flex flex-row md:gap-6 gap-2">
//             <div className="bg-white rounded-lg shadow-lg md:p-4 p-2">
//               <h1 className="md:text-[32px] text-[24px] font-bold text-blue-500">
//                 {data.total_boreholes}
//               </h1>
//               <p className="md:text-[20px] text-[14px] text-[#4B5563] md:w-fit w-20">
//                 Total Boreholes
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-lg md:p-4 p-2">
//               <h1 className="md:text-[32px] text-[24px] font-bold text-blue-500">
//                 {data.active_projects}
//               </h1>
//               <p className="md:text-[20px] text-[14px] text-[#4B5563] md:w-fit w-20">
//                 Active Projects
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-lg md:p-4 p-2">
//               <h1 className="md:text-[32px] text-[24px] font-bold text-blue-500">
//                 {data.recent_updates}
//               </h1>
//               <p className="md:text-[20px] text-[14px] text-[#4B5563] md:w-fit w-20">
//                 Recent Updates
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DashboardHomeComponent;
