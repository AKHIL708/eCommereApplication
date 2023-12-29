import AllCustomerOrders from "../../components/adminPages/AllCustomerOrder/AllCustomerOrders.jsx";
import Dashboard from "../../components/adminPages/Dashboard/Dashboard.jsx";
import EditProduct from "../../components/adminPages/EditProduct/EditProduct.jsx";
import AddProduct from "../../components/adminPages/addProduct/AddProduct.jsx";
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
  {
    path: "product/add",
    requiredRole: "admin",
    componentRender: <AddProduct />,
  },
  {
    path: "product/edit/:productId",
    requiredRole: "admin",
    componentRender: <EditProduct />,
  },
  {
    path: "customer/allOrders",
    requiredRole: "admin",
    componentRender: <AllCustomerOrders />,
  },
];

export default adminRoutesList;
