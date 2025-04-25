import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer"; // 👈 import footer
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 md:ml-60 pb-14 md:pb-0">
        {/* Fixed Header */}
        <header className="fixed top-0 md:left-60 bg-white z-50 flex items-center w-full">
          <Header />
        </header>

        {/* Page content area with top padding for the fixed header */}
        <main className="pt-20 px-1">
          <Outlet />
        </main>

        {/* Footer - hidden on mobile */}
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
