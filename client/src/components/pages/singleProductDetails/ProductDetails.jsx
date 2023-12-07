import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shoeImage from "../../../assets/images/shoeImage.png";
import ScrollToTop from "../../reusableCompanents/Navbar/scrollToTop/ScrollToTop";

import("./ProductDetails.scss");

function ProductDetails() {
  const { productId } = useParams();
  const [id, setId] = useState("new id");
  const [selectQuantity, setSelecteQuantity] = useState(1);
  const [selectColor, setSelectColor] = useState(null);
  const handleSizeClick = (size) => {
    setSelectColor(size);
  };

  useEffect(() => {
    setId(productId);
  }, []);

  const handleQuantityLess = () => {
    if (selectQuantity <= 1) {
      setSelecteQuantity(1);
    } else {
      setSelecteQuantity(selectQuantity - 1);
    }
  };

  return (
    <>
      <ScrollToTop />
      <section id="product-details">
        <div className="top-details">
          <div className="col">
            <div
              className="store-img"
              style={{ backgroundImage: `url(${shoeImage})` }}
            ></div>
            <div className="diff-images">
              <div
                className="box"
                style={{ backgroundImage: `url(${shoeImage})` }}
              ></div>
              <div
                className="box"
                style={{ backgroundImage: `url(${shoeImage})` }}
              ></div>
              <div
                className="box"
                style={{ backgroundImage: `url(${shoeImage})` }}
              ></div>
            </div>
          </div>
          <div className="col">
            <h1>Name of Product</h1>
            <p className="Desp">
              best thing to wear for yourself in this world right now ..
            </p>
            <h2 className="price">
              ₹ 1500 <span>inclusive all taxes</span>
            </h2>
            <h2 className="cutoff price">
              ₹ 2500 <span>60% off</span>
            </h2>
            <div className="size-selection">
              <div
                className={`size ${selectColor === "S" ? "change-color" : ""}`}
                onClick={() => handleSizeClick("S")}
              >
                S
              </div>
              <div
                className={`size ${selectColor === "M" ? "change-color" : ""}`}
                onClick={() => handleSizeClick("M")}
              >
                M
              </div>
              <div
                className={`size ${selectColor === "L" ? "change-color" : ""}`}
                onClick={() => handleSizeClick("L")}
              >
                L
              </div>
              <div
                className={`size ${selectColor === "XL" ? "change-color" : ""}`}
                onClick={() => handleSizeClick("XL")}
              >
                XL
              </div>
            </div>
            <div className="quantity-to-buy">
              <header>
                <h1>Quantity</h1>
              </header>
              <div className="boxes">
                <div className="box">
                  <p className="icon" onClick={() => handleQuantityLess()}>
                    -
                  </p>
                </div>
                <div className="box">
                  <p>{selectQuantity}</p>
                </div>
                <div className="box">
                  <p
                    className="icon"
                    onClick={() => setSelecteQuantity(selectQuantity + 1)}
                  >
                    +
                  </p>
                </div>
              </div>
              <div className="items-left">
                <p>15 left hurry up .</p>
              </div>
            </div>
            <div className="add-to-cart">
              <button>Add to Cart</button>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
        <div className="product-reviews">
          <header>
            <h1>Product Reviews</h1>
          </header>
          <div className="reviews">
            <div className="row">
              <header>
                <h1>Akhil Nayak</h1>
                <p>26 dec 2023</p>
              </header>
              <p className="review-desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit nam veniam tempore dicta dolore praesentium dolores
                architecto eaque inventore voluptates itaque, fugit temporibus
                ratione facilis nesciunt mollitia quisquam quibusdam quas.
              </p>
            </div>
            <div className="row">
              <header>
                <h1>Akhil Nayak</h1>
                <p>26 dec 2023</p>
              </header>
              <p className="review-desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit nam veniam tempore dicta dolore praesentium dolores
                architecto eaque inventore voluptates itaque, fugit temporibus
                ratione facilis nesciunt mollitia quisquam quibusdam quas.
              </p>
            </div>
          </div>
        </div>
        <div className="add-review">
          <h1 style={{ fontSize: "5vw" }}>ADD SECTION NEED TO BE ADDED </h1>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
