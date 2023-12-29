import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartItemsContext from "../../../context/cartItemsHandlingContextApi/CartItemsContext.js";
import userAuthContext from "../../../context/userAuthContextApi/userAuthContext.js";
import Cookies from "js-cookie";
import "./Navbar.scss";

function Navbar() {
  const { totalCartItems, setTotalCartItems } = useContext(CartItemsContext);
  const { userToken, setUserToken } = useContext(userAuthContext);
  const [inputVal, setInputVal] = useState("");
  const [productNames, setProductsName] = useState([]);
  const [resultsArr, setResultsArr] = useState([]);
  const location = useLocation();
  console.log(location.pathname.startsWith("/admin"));
  let isAdmin = location.pathname.startsWith("/admin");

  const navigate = useNavigate();
  const logOut = () => {
    let confirm = window.confirm("Are Your Sure!");
    if (confirm) {
      window.alert("logged Out");
      Cookies.remove("userDetails");
      Cookies.remove("cartItems");
      setTotalCartItems(0);
      setUserToken(null);
      navigate("/user/login");
    } else {
      window.alert("Ok!");
    }
  };
  const fetchAllProductsNames = async () => {
    const url = `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/products`;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.log("error in getting products : ", error);
      return;
    }

    const data = await response.json();

    if (data.message == "success") {
      let result = data.result;
      setProductsName(result);
    }
  };
  const filters = () => {
    let filteredResultsArr = [];
    if (inputVal.length == 0) {
      setResultsArr([]);
    } else {
      for (let i = 0; i < productNames.length; i++) {
        if (
          productNames[i].pName.includes(inputVal) ||
          productNames[i].category.includes(inputVal)
        ) {
          filteredResultsArr.push(productNames[i]);
        }
      }
      setResultsArr(filteredResultsArr);
    }
  };

  useEffect(() => {
    filters();
  }, [inputVal]);

  useEffect(() => {
    // console.log(Cookies.get("cartItems"));
    // console.log("totalCarLenth : ", totalCartItems);
    // console.log(Cookies.get("cartItems"));

    if (Cookies.get("cartItems") !== undefined) {
      let cookiesdata = JSON.parse(Cookies.get("cartItems"));
      // console.log(cookiesdata);
      setTotalCartItems(cookiesdata);
    }
    fetchAllProductsNames();
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
          {!isAdmin ? (
            <>
              <div className="input-sec">
                <input
                  type="text"
                  placeholder="search"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <SearchIcon className="icon" />
                {resultsArr.length > 0 && (
                  <>
                    <div className="search-results">
                      {resultsArr.map((data, index) => {
                        return (
                          <>
                            <h1
                              onClick={() => {
                                navigate(`/productDetail/${data.id}`);
                                setInputVal("");
                              }}
                            >
                              {data.pName.length > 12
                                ? data.pName.substring(0, 20) + "..."
                                : data.pName}
                            </h1>
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
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
                          {/* <h1>
                        <Link to="/user/orderHistory">Order History</Link>
                      </h1> */}
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
                        <Link to="/user/login">Login</Link>
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
            </>
          ) : (
            <>
              <h1 style={{ fontFamily: "montseratBold", fontSize: "2.5vw" }}>
                {" "}
                Welcome Admin
              </h1>
              <div className="row">
                <button
                  style={{
                    cursor: "pointer",
                    padding: "0.5vw 1.6vw",
                    fontFamily: "poppinsBold",
                    fontSize: "1.2vw",
                  }}
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Dashboard
                </button>
              </div>
              <div className="row">
                <button
                  style={{
                    cursor: "pointer",
                    padding: "0.5vw 1.6vw",
                    fontFamily: "poppinsBold",
                    fontSize: "1.2vw",
                  }}
                  onClick={() => navigate("/admin/customer/allOrders")}
                >
                  Customer Orders
                </button>
              </div>
            </>
          )}
        </nav>
      </section>
    </>
  );
}

export default Navbar;
