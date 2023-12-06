import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./Navbar.scss";

function Navbar() {
  return (
    <>
      <section id="Navbar">
        <nav>
          <header>
            <h1>AK007</h1>
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
                  <h1 className="top-header">My Account</h1>
                  <h1>Order History</h1>
                  <h1>LogOut</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <AddShoppingCartIcon className="icon" />
              <h1>Cart</h1>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
