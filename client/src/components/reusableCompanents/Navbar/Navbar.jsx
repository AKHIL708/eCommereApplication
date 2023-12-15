import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import CartItemsContext from "../../../context/cartItemsHandlingContextApi/CartItemsContext.js";
import userAuthContext from "../../../context/userAuthContextApi/userAuthContext.js";
import Cookies from "js-cookie";
import "./Navbar.scss";

function Navbar() {
  const { totalCartItems, setTotalCartItems } = useContext(CartItemsContext);
  const { userToken, setUserToken } = useContext(userAuthContext);
  const navigate = useNavigate();
  const logOut = () => {
    let confirm = window.confirm("Are Your Sure!");
    if (confirm) {
      window.alert("logged Out");
      Cookies.remove("userToken");
      setUserToken(null);
      navigate("/login");
    } else {
      window.alert("Ok!");
    }
  };
  useEffect(() => {
    // console.log(Cookies.get("cartItems"));
    // console.log("totalCarLenth : ", totalCartItems);
    // console.log(Cookies.get("cartItems"));

    if (Cookies.get("cartItems") !== undefined) {
      let cookiesdata = JSON.parse(Cookies.get("cartItems"));
      // console.log(cookiesdata);
      setTotalCartItems(cookiesdata);
    }
  }, []);

  return (
    <>
      <section id="Navbar">
        <nav>
          <header>
            <h1>
              <Link to="/">AK007</Link>
            </h1>
          </header>
          <div className="input-sec">
            <input type="text" placeholder="search" />
            <SearchIcon className="icon" />
          </div>
          <div className="account-section">
            {userToken !== null ? (
              <>
                <div className="row">
                  <PersonIcon className="icon" />
                  <h1>Account</h1>
                  <div className="show-account-details">
                    <div className="details">
                      <h1 className="top-header">
                        <Link to="/user/account">My Account</Link>
                      </h1>
                      <h1>
                        <Link to="/user/orderHistory">Order History</Link>
                      </h1>
                      <h1 onClick={() => logOut()}>LogOut</h1>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  {" "}
                  <h1>
                    {" "}
                    <Link to="/login">Login</Link>
                  </h1>
                </div>
              </>
            )}
            <div
              className="row"
              title="add the lenght of cart items in localStorage and show that "
            >
              {" "}
              {totalCartItems.length > 0 ? (
                <>
                  {" "}
                  <div className="cart-counter">
                    <p>{totalCartItems.length}</p>
                  </div>
                </>
              ) : (
                <> </>
              )}
              <Link to="/cart">
                {" "}
                <AddShoppingCartIcon className="icon" />
              </Link>
              <h1>
                {" "}
                <Link to="/cart">Cart </Link>
              </h1>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
