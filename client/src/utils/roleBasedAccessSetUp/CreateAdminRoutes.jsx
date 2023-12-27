import Dashboard from "../../components/adminPages/Dashboard.jsx";
import AdminLogin from "../../components/adminPages/login/AdminLogin.jsx";

const adminRoutesList = [
  {
    path: "dashboard",
    requiredRole: "admin",
    componentRender: <Dashboard />,
  },
  {
    path: "login",
    requiredRole: "admin",
    componentRender: <AdminLogin />,
  },
];

export default adminRoutesList;
