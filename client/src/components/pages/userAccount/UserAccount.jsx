import React, { useState } from "react";
import "./UserAccount.scss";

function UserAccount() {
  const [activeLink, setActiveLink] = useState("profile");
  const [section, setSection] = useState("profile");

  const handleClick = (data) => {
    setActiveLink(data);
    setSection(data);
  };
  return (
    <>
      <section id="user-account">
        <div className="col">
          <div className="row">
            <header>
              <h1>ACCOUNT</h1>
            </header>
            <p
              onClick={() => {
                handleClick("profile");
              }}
              className={`${activeLink == "profile" ? "active-link" : ""}`}
            >
              Profile
            </p>
            <p
              className={`${
                activeLink == "change-password" ? "active-link" : ""
              }`}
              onClick={() => handleClick("change-password")}
            >
              Change Password
            </p>
            <p
              className={`${activeLink == "address" ? "active-link" : ""}`}
              onClick={() => handleClick("address")}
            >
              Address
            </p>
            <p
              className={`${activeLink == "wish-list" ? "active-link" : ""}`}
              onClick={() => handleClick("wish-list")}
            >
              Wishlist
            </p>
          </div>
          <div className="row">
            <header>
              <h1>ORDERS</h1>
            </header>
            <p
              className={`${
                activeLink == "order-history" ? "active-link" : ""
              }`}
              onClick={() => handleClick("order-history")}
            >
              Order History
            </p>
            <p
              className={`${activeLink == "returns" ? "active-link" : ""}`}
              onClick={() => handleClick("returns")}
            >
              Returns
            </p>
            <p
              className={`${activeLink == "cash-backs" ? "active-link" : ""}`}
              onClick={() => handleClick("cash-backs")}
            >
              Cash Backs
            </p>
            <p
              className={`${activeLink == "ticket" ? "active-link" : ""}`}
              onClick={() => handleClick("ticket")}
            >
              Open a Ticket
            </p>
            <p
              className={`${
                activeLink == "ticket-status" ? "active-link" : ""
              }`}
              onClick={() => handleClick("ticket-status")}
            >
              Check Ticket Status
            </p>
          </div>
          <div className="row">
            <button>Log Out</button>
          </div>
        </div>
        <div className="col">
          {section == "profile" ? (
            <>
              <section id="profile">
                <header>
                  <h1>Personal Details</h1>
                </header>
                <div className="row">
                  <h1>Name</h1>
                  <input type="text" placeholder="Enter Name" />
                </div>
                <div className="row">
                  <h1>E-mail</h1>
                  <input type="text" placeholder="Enter E-mail" />
                </div>
                <div className="row">
                  <h1>Telephone</h1>
                  <input type="text" placeholder="phone" maxLength={10} />
                </div>
                <div className="row">
                  <button>Continue</button>
                </div>
              </section>
            </>
          ) : (
            <></>
          )}
          {section == "change-password" ? (
            <>
              <section id="change-password">
                <header>
                  <h1>Change Password</h1>
                </header>
                <div className="row curr-password">
                  <p>current password</p>
                  <input type="text" placeholder="Enter Current Password" />
                  <button>Verify</button>
                </div>
                <div className="row">
                  <p>New Password</p>
                  <input type="text" placeholder="enter password" />
                </div>
                <div className="row">
                  {" "}
                  <p>Confirm Password</p>
                  <input type="text" placeholder="confirm password" />
                </div>
                <div className="row">
                  <button>Update Password</button>
                </div>
              </section>
            </>
          ) : (
            <></>
          )}

          {section == "address" ? (
            <>
              <section id="address">
                <header>
                  <h1>Address</h1>
                </header>
                <div className="row">
                  <p>Akhil nayak Jarapla</p>
                  <p>
                    5-9-953 gunfoundry beside three temple himayathnagar
                    Hyderabad
                  </p>
                  <p>Hyderabad City 500029</p>
                  <p>Telangana</p>
                  <p>India</p>
                </div>
              </section>
            </>
          ) : (
            <></>
          )}
          {section == "wish-list" ? <> </> : <></>}
          {section == "order-history" ? <>order-history </> : <></>}
          {section == "returns" ? <>returns </> : <></>}
          {section == "cash-backs" ? <>cash-backs </> : <></>}
          {section == "ticket" ? <>ticket </> : <></>}
          {section == "ticket-status" ? <>ticket-status </> : <></>}
        </div>
      </section>
    </>
  );
}

export default UserAccount;
