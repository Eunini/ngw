import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Layout from "./components/Layout.jsx";
// import NewEntryHeader from "./components/NewEntryHeader.jsx";

export const demoUser = { email: "johndoe@mail.com", password: "john300" };
export const adminUser = { email: "admindoe@mail.com", password: "admin300" };

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
// const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const NewEntry = lazy(() => import("./pages/NewEntry.jsx"));
const UserDashboard = lazy(() => import("./pages/UserDashboard.jsx"));
const Feedback = lazy(() => import("./pages/Feedback.jsx"));

const AdminLayout = lazy(() =>
  import("./pages/AdminDashboard/components/Layout.jsx")
);
const Overview = lazy(() =>
  import("./pages/AdminDashboard/pages/Overview.jsx")
);
const Analytics = lazy(() =>
  import("./pages/AdminDashboard/pages/Analytics.jsx")
);
const Reports = lazy(() => import("./pages/AdminDashboard/pages/Reports.jsx"));
const AdminMap = lazy(() =>
  import("./pages/AdminDashboard/pages/AdminMap.jsx")
);
const AccessControl = lazy(() =>
  import("./pages/AdminDashboard/pages/Access-Control.jsx")
);
const AdminNewEntry = lazy(() =>
  import("./pages/AdminDashboard/pages/NewEntry.jsx")
);
const AdminFeedback = lazy(() =>
  import("./pages/AdminDashboard/pages/Feedback.jsx")
);

// New pages for Projects and Users
const ProjectsList = lazy(() =>
  import("./pages/AdminDashboard/pages/Projects/index.jsx")
);
const ProjectDetail = lazy(() =>
  import("./pages/AdminDashboard/pages/Projects/ProjectDetail.jsx")
);
const UsersList = lazy(() =>
  import("./pages/AdminDashboard/pages/Users/index.jsx")
);
const UserDetail = lazy(() =>
  import("./pages/AdminDashboard/pages/Users/UserDetail.jsx")
);

// Layout components
const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-[#1B4965] rounded-full animate-bounce opacity-30"></div>
      <div className="w-3 h-3 bg-[#62B6CB] rounded-full animate-bounce opacity-30 delay-150"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce opacity-30 delay-300"></div>
    </div>
  </div>
);

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // smooth scrolling
  });
};

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* All regular pages share the same MainLayout */}
          <Route
            element={
              <Layout
                Myheader={<Header />}
                Myfooter={<Footer />}
                // NewEntryHeader={<NewEntryHeader />}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/newentry" element={<NewEntry />} />
            <Route path="/feedback" element={<Feedback />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="adminmap" element={<AdminMap />} />
            <Route path="newentry" element={<AdminNewEntry />} />
            <Route path="access-control" element={<AccessControl />} />
            <Route path="feedback" element={<AdminFeedback />} />

            {/* Projects routes */}
            <Route path="projects" element={<Outlet />}>
              <Route index element={<ProjectsList />} />
              <Route path=":id" element={<ProjectDetail />} />
              <Route path="new" element={<AdminNewEntry />} />
            </Route>

            {/* Users routes */}
            <Route path="users" element={<Outlet />}>
              <Route index element={<UsersList />} />
              <Route path=":id" element={<UserDetail />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
