import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
import { Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-[#1B4965] rounded-full animate-bounce opacity-30"></div>
      <div className="w-3 h-3 bg-[#62B6CB] rounded-full animate-bounce opacity-30 delay-150"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce opacity-30 delay-300"></div>
    </div>
  </div>
);

function Layout({
  // children,
  Myheader,
  Myfooter,
  DashboardFooter,
  DashboardHeader,
  NewEntryHeader,
}) {
  const location = useLocation();
  const hideHeaderAndFooterPaths = [
    // "/login",
    // "/dashboard",
    "/newentry",
    "/userdashboard",
    "/admin",
  ];
  const showFooter = ["/userdashboard"]
  const notHome = ["feedback"];
  // const showDashboardFooterPaths = ["/dashboard"];
  // const showDashboardHeaderPaths = ["/dashboard"];
  // const showNewEntryHeaderPaths = ["/newentry"];

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col bg-[#F0F7F9]">
        <header
          className={notHome.includes(location.pathname) ? "bg-[#1B4965]" : ""}
        >
          {!hideHeaderAndFooterPaths.includes(location.pathname) && Myheader}
          {/* {showDashboardHeaderPaths.includes(location.pathname) &&
            DashboardHeader} */}
          {/* {showNewEntryHeaderPaths.includes(location.pathname) &&
            NewEntryHeader} */}
        </header>
        <main>
          <Outlet />
        </main>
        <footer className="bg-primary-black text-white w-full">
          {!hideHeaderAndFooterPaths.includes(location.pathname) && Myfooter}
          {/* {showDashboardFooterPaths.includes(location.pathname) &&
            DashboardFooter} */}
            {/* {showFooter.includes(location.pathname) && Myfooter} */}
        </footer>
      </div>
    </Suspense>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  Myheader: PropTypes.node.isRequired,
  Myfooter: PropTypes.node.isRequired,
  DashboardFooter: PropTypes.node.isRequired,
  DashboardHeader: PropTypes.node.isRequired,
  NewEntryHeader: PropTypes.node.isRequired,
};

export default Layout;
