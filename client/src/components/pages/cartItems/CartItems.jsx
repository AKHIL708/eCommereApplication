import React, { useContext, useEffect, useState } from "react";
import shoeImage from "../../../assets/images/shoeImage.png";
import CartItemsContext from "../../../context/cartItemsHandlingContextApi/CartItemsContext";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import couponCode from "../../../utils/couponCode/couponCode";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../checkOut/CheckOut.scss";
import "./CartItems.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CartItems() {
  // snack bar handling start
  const [openNotification, setOpenNotification] = useState({
    open: false,
    message: "hello",
    severity: "success",
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open, message, severity } = openNotification;

  const handleClick = ({ open, message, severity }) => {
    // console.log(message, open, severity);
    setOpenNotification({
      ...openNotification,
      open,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setOpenNotification({ ...openNotification, open: false });
  };

  // snack bar handling end

  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orginalMRP, setOriginalMRP] = useState(0);
  const [discountedMRP, setDiscountedMRP] = useState(0);
  const [checkoutTotalAmount, setCheckoutTotalAmount] = useState(0);
  const { totalCartItems, setTotalCartItems } = useContext(CartItemsContext); // context details
  const [couponInput, setCouponInput] = useState("");
  const [showCouponSection, setShowCouponSection] = useState(true);
  const [cartItems, setCartItems] = useState([]);
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
      // window.alert("Edited Successfully");
      handleClick({
        open: true,
        message: "Address Updated",
        severity: "success",
      });
      setShowSection("address");
    }
  };

  const calculateMRP = () => {
    let MRP = 0;
    cartItems.map((data, index) => {
      MRP = MRP + data.originalPrice * data.quantity;
    });
    return MRP;
  };
  const calculateDiscount = () => {
    let discountPrice = 0;
    cartItems.map((data, index) => {
      discountPrice = discountPrice + data.discountedPrice * data.quantity;
    });
    return calculateMRP() - discountPrice;
  };
  const calCheckoutAmount = (mrp, discount) => {
    let subTotalAmount = mrp - discount;
    if (subTotalAmount > 999) {
      setCheckoutTotalAmount(subTotalAmount);
    } else {
      setCheckoutTotalAmount(subTotalAmount + 59);
    }
  };
  const deleteFromCart = (id) => {
    let findIndex = 0;
    let updatedArr = cartItems;

    cartItems.map((data, index) => {
      if (data.id == id) {
        findIndex = index;
        return findIndex;
      }
    });
    if (findIndex != -1) {
      updatedArr.splice(findIndex, 1);
      Cookies.set("cartItems", JSON.stringify(updatedArr));
      setCartItems(JSON.parse(Cookies.get("cartItems")));
      setTotalCartItems(updatedArr);
      handleClick({
        message: "item removed SuccessFully !",
        severity: "info",
        open: true,
      });
    }
    // console.log(updatedArr);
  };

  const ApplyCouponCode = () => {
    if (couponInput == couponCode.validCoupon) {
      setCheckoutTotalAmount((prevAmount) => prevAmount - 100);
      handleClick({
        message: "Coupon Code Applied.",
        severity: "success",
        open: true,
      });
      setShowCouponSection(false);
    } else {
      handleClick({
        message: "Entered Coupon Does't Exist",
        severity: "error",
        open: true,
      });
      setCouponInput("");
    }
  };
  const handleCheckout = () => {
    if (Cookies.get("userToken") != undefined) {
      setShowCheckout(true);
      setTimeout(() => {
        window.scrollTo({
          top: 900,
          behavior: "smooth",
        });
      }, 200);
    } else {
      navigate("/login");
    }
  };
  const placeOrder = () => {
    // console.log(methodOfPayment == '')
    window.alert(
      "1. clear the cookies Cart Items \n 2. clear the context totalCartItems \n 3. add the order placed details in the table and then navigate to orders page and show the order details fetch  "
    );

    if (methodOfPayment == "") {
      handleClick({
        open: true,
        message: "Select Payment Method",
        severity: "warning",
      });
    } else {
      handleClick({
        open: true,
        message: "orderPlaced!",
        severity: "success",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    if (Cookies.get("cartItems") !== undefined) {
      let cookiesdata = JSON.parse(Cookies.get("cartItems"));
      // console.log(cookiesdata);
      setCartItems(cookiesdata);
      setOriginalMRP(calculateMRP());
    }
  }, []);

  useEffect(() => {
    let mrp = calculateMRP();
    let discountedMRP = calculateDiscount();
    setOriginalMRP(mrp);
    setDiscountedMRP(discountedMRP);
    calCheckoutAmount(calculateMRP(), calculateDiscount());
  }, [cartItems]);

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          {" "}
          <section id="cart-items">
            <div className="col">
              <header>
                <h1>items</h1>
              </header>
              <div className="row-header">
                <h1>PRODUCT</h1>
                <p>PRICE</p>
                <p>QUANTITY</p>
              </div>
              {cartItems.map((data, index) => {
                return (
                  <>
                    {" "}
                    <div
                      key={index}
                      className={`row ${index % 2 != 0 ? "add-gray" : ""}`}
                    >
                      <div
                        className="store-image"
                        style={{ backgroundImage: `url(${shoeImage})` }}
                      ></div>
                      <div className="product-desp">
                        <p>{data.pName}</p>
                        <p>size : {data.size}</p>
                        <div
                          className="delete-product"
                          onClick={() => deleteFromCart(data.id)}
                        >
                          <DeleteIcon className="icon" />
                          <p>delete</p>
                        </div>
                      </div>
                      <div className="price">
                        <p>₹ {data.discountedPrice}</p>
                      </div>
                      <div className="quantity">
                        {/* <select name="" id="">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select> */}
                        <p>{data.quantity}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="col">
              <div className="row">
                <p>MRP:</p>
                <p>₹ {orginalMRP}</p>
              </div>
              <div className="row">
                <p>Discount:</p>
                <p>₹ {discountedMRP}</p>
              </div>
              <div className="row">
                <p>sub-total:</p>
                <p>₹ {orginalMRP - discountedMRP}</p>
              </div>
              <div className="row">
                <p>Shipping Cost:</p>
                <p>₹ {calculateMRP() - calculateDiscount() > 999 ? 0 : 59}</p>
              </div>
              <div className="row total">
                <p>Total</p>
                <p>₹ {checkoutTotalAmount}</p>
              </div>
              {showCouponSection && (
                <>
                  <div className="row">
                    <input
                      type="text"
                      placeholder="enter your coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <button onClick={() => ApplyCouponCode()}>
                      Apply coupon
                    </button>
                  </div>
                </>
              )}
              <div className="row">
                <button onClick={() => handleCheckout()} className="check-out">
                  CHECKOUT
                </button>
              </div>
              <div className="row">
                <h1>
                  "Free Shipping on all orders above ₹999 | Use code EXTRA10 to
                  get an additional 10% off on purchases above ₹1999."
                </h1>{" "}
              </div>
            </div>
          </section>{" "}
          {showCheckout && (
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
                            <button
                              onClick={() => setShowSection("edit-address")}
                            >
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
                              onChange={(e) =>
                                setMethodOfpayment(e.target.value)
                              }
                              checked={methodOfPayment === "COD"}
                            />
                            <h1>Cash On Delivery</h1>
                          </div>
                          <div className="row">
                            <input
                              type="radio"
                              value="UPI"
                              onChange={(e) =>
                                setMethodOfpayment(e.target.value)
                              }
                              checked={methodOfPayment === "UPI"}
                            />
                            <h1>UPI</h1>
                          </div>
                          <div className="row">
                            <button onClick={() => placeOrder()}>
                              Place Order
                            </button>
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
                                  handleAddressChange(
                                    "firstName",
                                    e.target.value
                                  )
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
                                  handleAddressChange(
                                    "lastName",
                                    e.target.value
                                  )
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
              </section>{" "}
            </>
          )}
        </>
      ) : (
        <>
          <section className="empty-cart">
            <h1>No Items to show in cart</h1>
          </section>
        </>
      )}

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

export default CartItems;
