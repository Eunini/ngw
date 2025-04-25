import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./index";
import Overview from "./pages/Overview";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Overview />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
