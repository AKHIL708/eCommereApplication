import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const logOut = () => {
    let confirm = window.confirm("Are Your Sure!");
    if (confirm) {
      window.alert("logged Out");
    } else {
      window.alert("Ok!");
    }
  };
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
            <div
              className="row"
              title="add the lenght of cart items in localStorage and show that "
            >
              {" "}
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
