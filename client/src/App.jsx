import "./App.css";
import Navbar from "./components/reusableCompanents/Navbar/Navbar";
import Home from "./components/pages/Home/Home";
import UserAccount from "./components/pages/userAccount/UserAccount";
import SingleProductDetails from "./components/pages/singleProductDetails/SingleProductDetails";
import CategoryProducts from "./components/pages/categoryProducts/CategoryProducts";
import NotFound from "./components/pages/notFound/NotFound";
import CartProvider from "./context/cartItemsHandlingContextApi/CartItemsContextProvider.jsx";
import UserAuthContextProvider from "./context/userAuthContextApi/UserAuthContextProvider.jsx";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/reusableCompanents/Navbar/scrollToTop/ScrollToTop";
import CartItems from "./components/pages/cartItems/CartItems";
// import CheckOut from "./components/pages/checkOut/CheckOut.jsx";
import Login from "./components/reusableCompanents/login/Login.jsx";
import adminRoutesList from "./utils/roleBasedAccessSetUp/CreateAdminRoutes.jsx";
import Loader from "./components/reusableCompanents/waitingLoader/Loader.jsx";
import PrivateRoutes from "./utils/roleBasedAccessSetUp/privateRoutes.jsx";
import AdminLogin from "./components/adminPages/login/AdminLogin.jsx";

function App() {
  const location = useLocation();
  console.log(location.pathname.startsWith("/admin"));
  let isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <CartProvider>
        <UserAuthContextProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/user/login"
              element={
                <PrivateRoutes requiredRole={"user"}>
                  <Login />
                </PrivateRoutes>
              }
            />
            <Route exact path="/user/account/*" element={<UserAccount />} />
            <Route
              exact
              path="/productDetail/:productId"
              element={<SingleProductDetails />}
            />
            <Route
              exact
              path="/category/:categorySelected"
              element={<CategoryProducts />}
            />
            <Route exact path="/cart" element={<CartItems />} />
            {/* <Route exact path="/check-out" element={<CheckOut />} /> */}
            <Route exact path="/order-received" element={<Loader />} />

            {/* admin Login page  */}
            <Route exact path="/admin/login" element={<AdminLogin />} />

            {/* <Route exact path="/admin/login" element={adminRoutesList[1].componentRender} /> */}
            {adminRoutesList.map((data, i) => {
              // console.log(data);
              return (
                <Route
                  key={`route-number-${i}`}
                  path={`/admin/${data.path}`}
                  element={
                    <PrivateRoutes requiredRole={data.requiredRole}>
                      {data.componentRender}
                    </PrivateRoutes>
                  }
                />
              );
            })}

            {/* if no route matched  */}
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </UserAuthContextProvider>
      </CartProvider>
    </>
  );
}

export default App;
