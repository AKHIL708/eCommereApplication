import React, { isValidElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Cookies from "js-cookie";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import _ from "lodash";
import "./UserAccount.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserAccount() {
  const [notification, setNotification] = useState({
    open: false,
    message: "hello",
    severity: "success",
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open, message, severity } = notification;

  const handleNotificationBar = ({ open, message, severity }) => {
    // console.log(message, open, severity);
    setNotification({
      ...notification,
      open,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const navigate = useNavigate();
  let userId;
  if (Cookies.get("userDetails") != undefined) {
    userId = JSON.parse(Cookies.get("userDetails")).id;
  }

  // console.log(userId);
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    joinedDate: "",
    address: "",
    state: "",
    pincode: "",
    city: "",
  });
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    joinedDate,
    address,
    state,
    pincode,
    phoneNo,
    city,
  } = userDetails;
  const [activeLink, setActiveLink] = useState("profile");
  const [section, setSection] = useState("profile");
  const [currPassword, setCurrPassword] = useState("");
  const [handleNewPassword, setHandleNewPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isPasswordVerify, setIsPasswordVerify] = useState(true);
  const [orderHistoryData, setOrderHistoryData] = useState(null);
  const [particularOrderHistory, setParticularOrderHistory] = useState({
    show: false,
    data: [],
    productDetails: null,
  });

  const currentPathname = window.location.pathname.substring(0, 13);

  const handleClick = (data) => {
    setActiveLink(data);
    setSection(data);

    const newPathname = `${currentPathname}/${data}`;
    // console.log(newPathname.substring(0, 14));

    // Use navigate to update the URL
    navigate(newPathname);
  };

  const handleUserDetailsChange = (key, data) => {
    setUserDetails({ ...userDetails, [key]: data });
  };
  const EditAddress = async () => {
    if (
      firstName.length < 5 ||
      lastName.length < 5 ||
      city.length < 5 ||
      phoneNo.length < 10 ||
      address.length < 5 ||
      state.length < 5 ||
      pincode.length < 5
    ) {
      window.alert("Invalid Details Found !");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: id,
        data: [
          {
            column: "firstName",
            value: firstName,
          },
          {
            column: "lastName",
            value: lastName,
          },
          {
            column: "phoneNo",
            value: phoneNo,
          },
          {
            column: "address",
            value: address,
          },
          {
            column: "state",
            value: state,
          },
          {
            column: "pincode",
            value: pincode,
          },
          {
            column: "city",
            value: city,
          },
        ],
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/users/update`,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.text();
        console.log(error);
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data.message == "success") {
        fetchUserDetails(userDetails.id);
        handleNotificationBar({
          open: true,
          message: "Address Updated",
          severity: "success",
        });
        setSection("address");
      }
    }
  };
  const fetchUserDetails = async (userId) => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/users/${userId}`;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      return;
    }
    const data = await response.json();
    if (data.message == "success") {
      // console.log(data);
      let result = data.result[0];
      setUserDetails(result);
    } else {
      window.alert("cannot fetch user deatils ");
    }
  };

  const verifyCurrentPassword = () => {
    if (currPassword == userDetails.password) {
      handleNotificationBar({
        open: true,
        message: "password verified",
        severity: "success",
      });
      setIsPasswordVerify(false);
    } else {
      handleNotificationBar({
        open: true,
        message: "Invalid Credentails.",
        severity: "error",
      });
      setCurrPassword("");
    }
  };
  const changePassword = async () => {
    if (
      handleNewPassword.newPassword !== handleNewPassword.confirmNewPassword
    ) {
      return handleNotificationBar({
        open: true,
        message: "confirm-password not matching!",
        severity: "error",
      });
    }
    if (
      handleNewPassword.newPassword.length < 5 &&
      handleNewPassword.confirmNewPassword < 5
    ) {
      return handleNotificationBar({
        open: true,
        message: "password length must be greater than 5",
        severity: "error",
      });
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: userId,
      data: [
        {
          column: "password",
          value: handleNewPassword.confirmNewPassword,
        },
      ],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let url = `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/users/update`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      return;
    }

    const data = await response.json();
    console.log(data);
    if (data.message == "success") {
      setCurrPassword("");
      setHandleNewPassword({
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsPasswordVerify(true);
      handleNotificationBar({
        open: true,
        message: "password changed",
        severity: "success",
      });
    }
  };

  const fetchUserOrderHistory = async () => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/orders/user/${userId}`;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      return;
    }

    const data = await response.json();
    console.log(data);
    if (data.message == "success") {
      let result = data.result;
      const groupedItems = result.reduce((groups, item) => {
        const groupedOrderId = item.groupedOrderId;
        groups[groupedOrderId] = groups[groupedOrderId] || [];
        groups[groupedOrderId].push(item);
        return groups;
      }, {});
      // console.log(groupedItems);
      setOrderHistoryData(groupedItems);
    }
  };

  const fetchSingleOrderHistory = async (groupedOrderId) => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/orders/user/placedOrders/${groupedOrderId}`;
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }
    let data = await response.json();
    if (data.message == "success") {
      console.log(data);

      let storeOrderHistoryProductDetails = [];
      for (let i = 0; i < data.result.length; i++) {
        storeOrderHistoryProductDetails.push(
          fetchProductDetails(data.result[i].productId)
        );
      }

      // wait until all promises are resolved ...
      const resolvedProductDetails = await Promise.all(
        storeOrderHistoryProductDetails
      );

      setParticularOrderHistory({
        ...particularOrderHistory,
        show: true,
        data: data.result,
        productDetails: resolvedProductDetails,
      });

      // setOrderHistoryProductDetails(resolvedProductDetails);
    }
  };

  const fetchProductDetails = async (productId) => {
    let url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/products/${productId}`;
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }
    let data = await response.json();
    if (data.message == "success") {
      console.log(data);
      return data.result[0];
    }
  };

  useEffect(() => {
    fetchUserDetails(userId);
    fetchUserOrderHistory();
  }, []);

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
                  <h1>First Name</h1>
                  <input
                    disabled
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                  />
                </div>
                <div className="row">
                  <h1>Last Name</h1>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter Last Name"
                    value={lastName}
                  />
                </div>
                <div className="row">
                  <h1>E-mail</h1>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter E-mail"
                    value={email}
                  />
                </div>
                <div className="row">
                  <h1>Telephone</h1>
                  <input
                    type="text"
                    disabled
                    placeholder="phone"
                    maxLength={10}
                    value={phoneNo}
                  />
                </div>
                {/* <div className="row">
                  <button>Continue</button>
                </div> */}
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
                {isPasswordVerify && (
                  <>
                    <div className="row curr-password">
                      <p>current password</p>
                      <input
                        type="text"
                        placeholder="Enter Current Password"
                        value={currPassword}
                        onChange={(e) => setCurrPassword(e.target.value)}
                      />
                      <button onClick={() => verifyCurrentPassword()}>
                        Verify
                      </button>
                    </div>
                  </>
                )}
                {!isPasswordVerify && (
                  <>
                    <div className="row">
                      <p>New Password</p>
                      <input
                        type="text"
                        placeholder="enter password"
                        value={handleNewPassword.newPassword}
                        onChange={(e) =>
                          setHandleNewPassword({
                            ...handleNewPassword,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="row">
                      {" "}
                      <p>Confirm Password</p>
                      <input
                        type="text"
                        placeholder="confirm password"
                        value={handleNewPassword.confirmNewPassword}
                        onChange={(e) =>
                          setHandleNewPassword({
                            ...handleNewPassword,
                            confirmNewPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="row">
                      <button onClick={() => changePassword()}>
                        Update Password
                      </button>
                    </div>
                  </>
                )}
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
                    {city} City {pincode}
                  </p>
                  <p>{state}</p>
                  <p>India</p>
                </div>
                <div className="btn">
                  <button onClick={() => setSection("edit-address")}>
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
                          handleUserDetailsChange("firstName", e.target.value)
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
                          handleUserDetailsChange("lastName", e.target.value)
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
                          handleUserDetailsChange("address", e.target.value)
                        }
                      />
                    </div>
                    <div className="row">
                      {" "}
                      <p>Pin Code</p>
                      <input
                        type="text"
                        value={pincode}
                        placeholder="Pin Code"
                        onChange={(e) =>
                          handleUserDetailsChange("pincode", e.target.value)
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
                          handleUserDetailsChange("city", e.target.value)
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
                          handleUserDetailsChange("state", e.target.value)
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
                          handleUserDetailsChange("phoneNo", e.target.value)
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
          {section == "order-history" ? (
            <>
              {!particularOrderHistory.show && (
                <>
                  {" "}
                  <section id="order-history">
                    {orderHistoryData != null ? (
                      <>
                        {Object.entries(orderHistoryData).map(
                          ([groupedOrderId, items]) => (
                            <div
                              key={groupedOrderId}
                              onClick={() =>
                                fetchSingleOrderHistory(groupedOrderId)
                              }
                              className="order-history-card"
                            >
                              {/* Render details only once for each groupedOrderId */}
                              {items.length > 0 && (
                                <>
                                  <div className="row">
                                    <h1>Order Id</h1>
                                    <h2>:</h2>
                                    <p>{items[0].id}</p>
                                  </div>
                                  <div className="row">
                                    <h1>Total Product </h1>
                                    <h2>:</h2>
                                    <p>{items.length}</p>
                                  </div>
                                  <div className="row">
                                    <h1>Total Price </h1>
                                    <h2>:</h2>
                                    <p>{items[0].totalPriceValue}</p>
                                  </div>
                                  <div className="row">
                                    <h1>MOD </h1>
                                    <h2>:</h2>
                                    <p>{items[0].modeOfPayment}</p>
                                  </div>
                                  <div className="row">
                                    <h1>Placed On </h1>
                                    <h2>:</h2>
                                    <p>{items[0].placedTimeAt}</p>
                                  </div>
                                </>
                              )}
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        <h1>No order history</h1>
                      </>
                    )}
                  </section>
                </>
              )}
              {particularOrderHistory.show && (
                <>
                  <div id="product-history-cards">
                    {particularOrderHistory.data.map((data, index) => {
                      let image = JSON.parse(
                        particularOrderHistory.productDetails[index].images
                      );
                      // console.log(image);
                      return (
                        <>
                          <div className="history-card">
                            <div className="col">
                              <div
                                className="store-img"
                                onClick={() =>
                                  navigate(
                                    `/productDetail/${particularOrderHistory.productDetails[index].id}`
                                  )
                                }
                                style={{ backgroundImage: `url(${image[0]})` }}
                              ></div>
                            </div>
                            <div className="col">
                              {" "}
                              <div className="row">
                                <h1>pname </h1>
                                <span>:</span>
                                <p>
                                  {
                                    particularOrderHistory.productDetails[index]
                                      .pName
                                  }
                                </p>
                              </div>
                              <div className="row">
                                <h1>MOD </h1>
                                <span>:</span>
                                <p>{data.modeOfPayment}</p>
                              </div>
                              <div className="row">
                                <h1>status </h1>
                                <span>:</span>
                                <p>{data.orderStatus}</p>
                              </div>
                              <div className="row">
                                <h1>quantity </h1>
                                <span>:</span>

                                <p>{data.quantity}</p>
                              </div>
                              <div className="row">
                                <h1>Price </h1>
                                <span>:</span>
                                <p>
                                  {
                                    particularOrderHistory.productDetails[index]
                                      .discountPrice
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <div className="back-btn">
                      <button
                        onClick={() =>
                          setParticularOrderHistory({
                            ...particularOrderHistory,
                            show: false,
                          })
                        }
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {section == "returns" ? <>returns </> : <></>}
          {section == "cash-backs" ? <>cash-backs </> : <></>}
          {section == "ticket" ? <>ticket </> : <></>}
          {section == "ticket-status" ? <>ticket-status </> : <></>}
        </div>
      </section>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            <p style={{ fontFamily: "senRegular", fontSize: "1.2vw" }}>
              {" "}
              {message}
            </p>
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default UserAccount;
