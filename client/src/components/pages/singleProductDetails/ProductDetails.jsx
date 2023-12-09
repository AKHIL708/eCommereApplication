import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shoeImage from "../../../assets/images/shoeImage.png";
import categoryTech from "../../../assets/images/category-tech.jpg";
import categoryBook from "../../../assets/images/category-books.jpg";
import ScrollToTop from "../../reusableCompanents/Navbar/scrollToTop/ScrollToTop";

import("./ProductDetails.scss");

function ProductDetails() {
  const { productId } = useParams();
  const [selectColor, setSelectColor] = useState(null);
  const [addToCart, setAddToCart] = useState({
    id: Date.now(),
    userId: "userIdhere",
    productId,
    quantity: 1,
    size: null,
  });
  const [reviewData, setReviewData] = useState({
    Name: "",
    data: "",
  });
  const [productDetails, setProductDetails] = useState({
    id: "UpdateProductId",
    pName: "Product Name",
    category: "clothes",
    Availability: 5,
    originalPrice: 15000,
    mSizeAvl: 1,
    lSizeAvl: 2,
    sSizeAvl: 1,
    xlSizeAvl: 1,
    description:
      "best product you can use in winter season which cannot be imaged ",
    images: [shoeImage, categoryBook, categoryTech],
    discountPrice: 14000,
    isBestDeal: "yes",
  });

  const [totalProductsAvl, setTotalProductsAvl] = useState(
    productDetails.xlSizeAvl +
      productDetails.mSizeAvl +
      productDetails.sSizeAvl +
      productDetails.lSizeAvl
  );
  const [highLightImage, setHighLightImage] = useState(
    productDetails.images[0]
  );

  const handleSizeClick = (size) => {
    setSelectColor(size);
    setAddToCart({ ...addToCart, size: size });
  };

  const handleAddQuantity = () => {
    if (totalProductsAvl - 1 != 0) {
      setAddToCart({ ...addToCart, quantity: addToCart.quantity + 1 });
      setTotalProductsAvl(totalProductsAvl - 1);
    } else {
      window.alert("products end limits reached!");
    }
  };
  const handleQuantityLess = () => {
    if (addToCart.quantity <= 1) {
      setAddToCart({ ...addToCart, quantity: 1 });
    } else {
      setAddToCart({ ...addToCart, quantity: addToCart.quantity - 1 });
      setTotalProductsAvl(totalProductsAvl + 1);
    }
  };

  const AddReview = () => {
    console.log(reviewData);
    setReviewData({ Name: "", data: "" });
  };

  const AddToCart = () => {
    if (addToCart.size == null) {
      window.alert("Please select the size!");
    } else {
      // add to cart items using api call
      window.alert("Add the CartItems Add API HERE");
    }
  };

  useEffect(() => {
    setAddToCart({ ...addToCart, productId: productId });
  }, []);

  return (
    <>
      <ScrollToTop />
      <section id="product-details">
        <div className="top-details">
          <div className="col">
            <div
              className="store-img"
              style={{ backgroundImage: `url(${highLightImage})` }}
            ></div>
            <div className="diff-images">
              {productDetails.images.map((data, index) => {
                return (
                  <>
                    {" "}
                    <div
                      className="box"
                      style={{ backgroundImage: `url(${data})` }}
                      onClick={() => setHighLightImage(data)}
                    ></div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col">
            <h1>{productDetails.pName}</h1>
            <p className="Desp">{productDetails.description}</p>
            <h2 className="price">
              ₹ {productDetails.originalPrice}
              <span>inclusive all taxes</span>
            </h2>
            <h2 className="cutoff price">
              ₹ {productDetails.discountPrice} <span>60% off</span>
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
                  <p>{addToCart.quantity}</p>
                </div>
                <div className="box">
                  <p className="icon" onClick={() => handleAddQuantity()}>
                    +
                  </p>
                </div>
              </div>
              <div className="items-left">
                <p>{totalProductsAvl - 1} left hurry up .</p>
              </div>
            </div>
            <div className="add-to-cart">
              <button onClick={() => AddToCart()}>Add to Cart</button>
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
          <h1>Write Review</h1>
          <section className="col">
            <div className="row">
              <p>Your Name</p>
              <input
                type="text"
                placeholder="Your Name"
                value={reviewData.Name}
                onChange={(e) =>
                  setReviewData({ ...reviewData, Name: e.target.value })
                }
              />
            </div>
            <div className="row">
              <p>Your Review</p>{" "}
              <textarea
                value={reviewData.data}
                onChange={(e) =>
                  setReviewData({ ...reviewData, data: e.target.value })
                }
                type="text"
                placeholder="review"
                rows={5}
                cols={10}
              />
            </div>
            <div className="row">
              <button onClick={() => AddReview("data")}>Submit</button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
