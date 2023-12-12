import "./App.css";
import Navbar from "./components/reusableCompanents/Navbar/Navbar";
import Home from "./components/pages/Home/Home";
import OrderHistory from "./components/pages/orderHistory/OrderHistory";
import UserAccount from "./components/pages/userAccount/UserAccount";
import ProductDetails from "./components/pages/singleProductDetails/ProductDetails";
import CategoryProducts from "./components/pages/categoryProducts/CategoryProducts";
import NotFound from "./components/pages/notFound/NotFound";
import CartItemsContextProvider from "./context/cartItemsHandlingContextApi/CartItemsContextProvider";
import { Routes, Route } from "react-router-dom";
// import ScrollToTop from "react-scroll-to-top";
import ScrollToTop from "./components/reusableCompanents/Navbar/scrollToTop/ScrollToTop";
import CartItems from "./components/pages/cartItems/CartItems";
import CheckOut from "./components/pages/checkOut/CheckOut.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartItemsContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user/orderHistory" element={<OrderHistory />} />
          <Route exact path="/user/account" element={<UserAccount />} />
          <Route
            exact
            path="/productDetail/:productId"
            element={<ProductDetails />}
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
      </CartItemsContextProvider>
    </>
  );
}

export default App;
