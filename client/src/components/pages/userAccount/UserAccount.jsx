import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./UserAccount.scss";

function UserAccount() {
  const [activeLink, setActiveLink] = useState("profile");
  const [section, setSection] = useState("profile");
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    phoneNo: "",
    address: "",
    state: "",
    pinCode: "",
  });
  const { firstName, lastName, city, phoneNo, address, state, pinCode } =
    addressData;

  const handleClick = (data) => {
    setActiveLink(data);
    setSection(data);
  };
  const handleAddressChange = (key, data) => {
    setAddressData({ ...addressData, [key]: data });
  };
  const EditAddress = () => {
    if (
      firstName.length < 5 ||
      lastName.length < 5 ||
      city.length < 5 ||
      phoneNo.length < 5 ||
      address.length < 5 ||
      state.length < 5 ||
      pinCode.length < 5
    ) {
      window.alert(`${pinCode.length}`);
    } else {
      window.alert("Edited Successfully");
      setSection("address");
    }
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
                  <p>
                    {firstName} {lastName}
                  </p>
                  <p>{address}</p>
                  <p>
                    {city} City {pinCode}
                  </p>
                  <p>{state}</p>
                  <p>India</p>
                </div>
                <div className="btn" onClick={() => setSection("edit-address")}>
                  <button>
                    {" "}
                    <EditIcon className="edit-icon" /> Edit Address
                  </button>
                </div>
              </section>
            </>
          ) : (
            <></>
          )}
          {section == "edit-address" ? (
            <>
              <section id="edit-address">
                <header>
                  <h1>
                    Edit Address <span>*All Feilds Are Mandatory</span>
                  </h1>
                </header>
                <div className="columns">
                  <div className="col">
                    <div className="row">
                      <p>Fist Name</p>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) =>
                          handleAddressChange("firstName", e.target.value)
                        }
                      />
                    </div>
                    <div className="row">
                      {" "}
                      <p>Last Name</p>
                      <input
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) =>
                          handleAddressChange("lastName", e.target.value)
                        }
                      />
                    </div>
                    <div className="row">
                      {" "}
                      <p>Address</p>
                      <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) =>
                          handleAddressChange("address", e.target.value)
                        }
                      />
                    </div>
                    <div className="row">
                      {" "}
                      <p>Pin Code</p>
                      <input
                        type="text"
                        value={pinCode}
                        placeholder="Pin Code"
                        onChange={(e) =>
                          handleAddressChange("pinCode", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      {" "}
                      <p>City</p>
                      <input
                        type="text"
                        placeholder="city"
                        value={city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                      />
                    </div>
                    <div className="row">
                      {" "}
                      <p>state</p>
                      <input
                        type="text"
                        value={state}
                        placeholder="state"
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                      />
                    </div>
                    <div className="row">
                      {" "}
                      <p>phone</p>
                      <input
                        type="text"
                        placeholder="phone No"
                        value={phoneNo}
                        maxLength={10}
                        onChange={(e) =>
                          handleAddressChange("phoneNo", e.target.value)
                        }
                      />
                    </div>
                    <div className="row edit-btn">
                      {" "}
                      <button onClick={() => setSection("address")}>
                        {" "}
                        <ArrowBackIosIcon /> Back
                      </button>
                      <button onClick={() => EditAddress()}>
                        Continue Edit
                      </button>
                    </div>
                  </div>
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