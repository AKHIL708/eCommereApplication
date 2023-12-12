import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./CheckOut.scss";

function CheckOut() {
  const [showSection, setShowSection] = useState("address");
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

  const handleAddressChange = (key, data) => {
    setAddressData({ ...addressData, [key]: data });
  };

  const EditAddress = () => {
    if (
      firstName.length < 5 ||
      lastName.length < 5 ||
      city.length < 5 ||
      phoneNo.length < 10 ||
      address.length < 5 ||
      state.length < 5 ||
      pinCode.length < 5
    ) {
      window.alert("Invalid Details Found !");
    } else {
      window.alert("Edited Successfully");
      setShowSection("address");
    }
  };

  return (
    <>
      <section id="check-out">
        <div className="col">
          <header>
            <h1>Confirm Address</h1>
          </header>
          {showSection == "address" ? (
            <>
              <section id="address">
                {/* <header>
                  <h1>Address</h1>
                </header> */}
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
                  <p>PhoneNo : {phoneNo}</p>

                </div>
                <div
                  className="btn"
                  onClick={() => setShowSection("edit-address")}
                >
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

          {showSection == "edit-address" ? (
            <>
              <section id="edit-address">
                {/* <header>
                  <h1>
                    Edit Address <span>*All Feilds Are Mandatory</span>
                  </h1>
                </header> */}
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
                      <button onClick={() => setShowSection("address")}>
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
        </div>
        <div className="col"></div>
      </section>
    </>
  );
}

export default CheckOut;
