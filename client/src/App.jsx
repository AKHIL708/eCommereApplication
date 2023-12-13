import "./App.css";
import Navbar from "./components/reusableCompanents/Navbar/Navbar";
import Home from "./components/pages/Home/Home";
import UserAccount from "./components/pages/userAccount/UserAccount";
import SingleProductDetails from "./components/pages/singleProductDetails/SingleProductDetails";
import CategoryProducts from "./components/pages/categoryProducts/CategoryProducts";
import NotFound from "./components/pages/notFound/NotFound";
import CartProvider from "./context/cartItemsHandlingContextApi/CartItemsContextProvider.jsx";
import UserAuthContextProvider from "./context/userAuthContextApi/UserAuthContextProvider.jsx";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/reusableCompanents/Navbar/scrollToTop/ScrollToTop";
import CartItems from "./components/pages/cartItems/CartItems";
import CheckOut from "./components/pages/checkOut/CheckOut.jsx";
import Login from "./components/reusableCompanents/login/Login.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <CartProvider>
        <UserAuthContextProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
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
            <Route exact path="/check-out" element={<CheckOut />} />
            {/* if no route matched  */}
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </UserAuthContextProvider>
      </CartProvider>
    </>
  );
}

export default App;
