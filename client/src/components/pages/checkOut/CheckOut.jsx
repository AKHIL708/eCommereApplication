import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PhoneIcon from "@mui/icons-material/Phone";
import "./CheckOut.scss";

function CheckOut() {
  // initailly fetch the address from users table from sending the userID saved in cookies and then show the address in the inputs and when updated also update the user table
  const [showSection, setShowSection] = useState("address");
  const [methodOfPayment, setMethodOfpayment] = useState("");
  const [addressData, setAddressData] = useState({
    id: "",
    firstName: "Jarapla",
    lastName: "Akhil NK",
    password: "852485252",
    email: "aakhiljay06@gmail.com",
    phoneNo: "9618134708",
    joinedDate: "today",
    address: "5-9-953 gunfoundry beside three temple hyderguda",
    state: "Telangana",
    pinCode: "500029",
    city: "Hyderabad",
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
  const placeOrder = () => {
    window.alert(methodOfPayment);
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
                <div className="col">
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
                    <p>Phone No : {phoneNo}</p>
                  </div>
                  <div className="btn">
                    <button onClick={() => setShowSection("edit-address")}>
                      {" "}
                      <EditIcon className="edit-icon" /> Edit Address
                    </button>
                  </div>
                </div>
                <div className="col">
                  {/* <header>
                    <h1>payment Method</h1>
                  </header> */}
                  <div className="row">
                    <input
                      type="radio"
                      value="COD"
                      onChange={(e) => setMethodOfpayment(e.target.value)}
                      checked={methodOfPayment === "COD"}
                    />
                    <h1>Cash On Delivery</h1>
                  </div>
                  <div className="row">
                    <input
                      type="radio"
                      value="UPI"
                      onChange={(e) => setMethodOfpayment(e.target.value)}
                      checked={methodOfPayment === "UPI"}
                    />
                    <h1>UPI</h1>
                  </div>
                  <div className="row">
                    <button onClick={() => placeOrder()}>Place Order</button>
                  </div>
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
                  </div>
                  <div className="col">
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
                  </div>
                  <div className="col">
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
        {/* <div className="col"></div> */}
      </section>
    </>
  );
}

export default CheckOut;
