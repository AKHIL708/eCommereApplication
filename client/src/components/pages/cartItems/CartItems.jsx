import React, { useContext, useEffect, useState } from "react";
import shoeImage from "../../../assets/images/shoeImage.png";
import CartItemsContext from "../../../context/cartItemsHandlingContextApi/CartItemsContext";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import couponCode from "../../../utils/couponCode/couponCode";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./CartItems.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CartItems() {
  // snack bar handling start
  const [state, setState] = useState({
    open: false,
    message: "hello",
    severity: "success",
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open, message, severity } = state;

  const handleClick = ({ open, message, severity }) => {
    console.log(message, open, severity);
    setState({
      ...state,
      open,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // snack bar handling end

  const navigate = useNavigate();

  const [orginalMRP, setOriginalMRP] = useState(0);
  const [discountedMRP, setDiscountedMRP] = useState(0);

  const [checkoutTotalAmount, setCheckoutTotalAmount] = useState(0);
  const { totalCartItems, setTotalCartItems } = useContext(CartItemsContext);
  const [couponInput, setCouponInput] = useState("");

  const [cartItems, setCartItems] = useState([]);

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
    // console.log(subTotalAmount);
    if (subTotalAmount > 999) {
      setCheckoutTotalAmount(subTotalAmount);
    } else {
      setCheckoutTotalAmount(subTotalAmount + 59);
    }
  };

  const deleteFromCart = (id) => {
    // window.alert(id);
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

  const handleCheckout = () => {
    window.alert(couponCode.code);
    // if (Cookies.get("userToken") != undefined) {
    //   navigate("/check-out");
    // } else {
    //   navigate("/login");
    // }
  };
  const ApplyCouponCode = () => {
    if (couponInput == couponCode.validCoupon) {
      setCheckoutTotalAmount((prevAmount) => prevAmount - 100);
    }
  };

  useEffect(() => {
    if (Cookies.get("cartItems") !== undefined) {
      let cookiesdata = JSON.parse(Cookies.get("cartItems"));
      console.log(cookiesdata);
      setCartItems(cookiesdata);
      let mrp = calculateMRP();
      let discountedMRP = calculateDiscount();
      setOriginalMRP(mrp);
      setDiscountedMRP(discountedMRP);
      calCheckoutAmount(calculateMRP(), calculateDiscount());
    }
  }, [cartItems]);

  return (
    <>
      {/* <h1 style={{ color: "red" }}>
        NOTE only ui is done no functionality added till now!
      </h1> */}
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
                    <div className={`row ${index % 2 != 0 ? "add-gray" : ""}`}>
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
              <div className="row">
                <input
                  type="text"
                  placeholder="enter your coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button onClick={() => ApplyCouponCode()}>Apply coupon</button>
              </div>
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
