// import { lazy, Suspense } from "react";
// import { useActiveTab } from "../components/ActiveTabContext";



// const Home = lazy(() => import("../components/DashboardHomeComponent"));

// // display when loading
// const Loading = () => (
//   <div className="flex justify-center items-center h-screen">
//     <div className="flex space-x-2">
//       <div className="w-4 h-4 bg-[#1B4965] rounded-full animate-bounce opacity-30"></div>
//       <div className="w-3 h-3 bg-[#62B6CB] rounded-full animate-bounce opacity-30 delay-150"></div>
//       <div className="w-2 h-2 bg-white rounded-full animate-bounce opacity-30 delay-300"></div>
//     </div>
//   </div>
// );

// function Dashboard() {
//   const { isActive, setIsActive } = useActiveTab();

//   return (
//     <section className="w-full bg-[#F0F7F9]">
//       <Suspense fallback={<Loading/>}>{isActive === "Home" && <Home />}</Suspense>
//     </section>
//   );
// }

// export default Dashboard;
