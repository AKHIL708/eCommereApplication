import React, { useContext, useEffect, useState } from "react";
import shoeImage from "../../../assets/images/shoeImage.png";
import CartItemsContext from "../../../context/cartItemsHandlingContextApi/CartItemsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItems.scss";

function CartItems() {
  const [cartItems, setCartItems] = useState([
    {
      id: "cartid",
      image: shoeImage,
      pName: "Air jordan 1",
      price: 455,
      availability: 5,
      size: "M",
    },
    {
      id: "cartid",
      image: shoeImage,
      pName: "Air jordan 1",
      price: 455,
      availability: 5,
      size: "M",
    },
    {
      id: "cartid",
      image: shoeImage,
      pName: "Air jordan 1",
      price: 455,
      availability: 5,
      size: "M",
    },
    {
      id: "cartid",
      image: shoeImage,
      pName: "Air jordan 1",
      price: 455,
      availability: 5,
      size: "M",
    },
  ]);

  return (
    <>
      <h1 style={{ color: "red" }}>
        NOTE only ui is done no functionality added till now!
      </h1>
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
                    style={{ backgroundImage: `url(${data.image})` }}
                  ></div>
                  <div className="product-desp">
                    <p>{data.pName}</p>
                    <p>size : {data.size}</p>
                    <div
                      className="delete-product"
                      onClick={() => window.alert(data.id)}
                    >
                      <DeleteIcon className="icon" />
                      <p>delete</p>
                    </div>
                  </div>
                  <div className="price">
                    <p>₹ {data.price}</p>
                  </div>
                  <div className="quantity">
                    <select name="" id="">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
                ;
              </>
            );
          })}
        </div>

        <div className="col">
          <div className="row">
            <p>MRP:</p>
            <p>₹ 15236</p>
          </div>
          <div className="row">
            <p>Discount:</p>
            <p>₹ 15236</p>
          </div>
          <div className="row">
            <p>sub-total:</p>
            <p>₹ 15236</p>
          </div>
          <div className="row">
            <p>free shipping:</p>
            <p>₹ 15236</p>
          </div>
          <div className="row total">
            <p>Total</p>
            <p>₹ 15236</p>
          </div>
          <div className="row">
            <input type="text" placeholder="enter your coupon code" />
            <button>Apply coupon</button>
          </div>
          <div className="row">
            <button className="check-out">CHECKOUT</button>
          </div>
          <div className="row">
            <h1>
              "Free Shipping on all orders above ₹999 | Use code EXTRA10 to get
              an additional 10% off on purchases above ₹1999."
            </h1>{" "}
          </div>
        </div>
      </section>
    </>
  );
}

export default CartItems;
