import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import shoeImage from "../../../assets/images/shoeImage.png";
import categoryTech from "../../../assets/images/category-tech.jpg";
import categoryBook from "../../../assets/images/category-books.jpg";
import ScrollToTop from "../../reusableCompanents/Navbar/scrollToTop/ScrollToTop";
import CartItemsContext from "../../../context/cartItemsHandlingContextApi/CartItemsContext.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import("./SingleProductDetails.scss");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SingleProductDetails() {
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

  const { productId } = useParams();
  const { setTotalCartItems } = useContext(CartItemsContext);
  const [selectColor, setSelectColor] = useState(null);
  const [productQuantityAdded, setProductQuantityAdded] = useState(1);
  const [productSize, setProductSize] = useState(null);
  const [addItemsToCart, setAddItemsToCart] = useState([]);

  const [reviewData, setReviewData] = useState({
    id: "1",
    time: "dec 1st",
    productId,
    name: "",
    data: "",
  });
  const [productReviews, setProductReviews] = useState([
    {
      id: "1",
      time: "dec 1st",
      productId,
      name: "userName",
      data: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit nam veniam tempore dicta dolore praesentium dolores architecto eaque inventore voluptates itaque, fugit temporibus ratione facilis nesciunt mollitia quisquam quibusdam quas.",
    },
  ]);
  const [productDetails, setProductDetails] = useState({
    id: "UpdateProductId",
    pName: "Product Name",
    category: "clothes",
    Availability: 5,
    originalPrice: 500,
    mSizeAvl: 1,
    lSizeAvl: 2,
    sSizeAvl: 1,
    xlSizeAvl: 1,
    description:
      "best product you can use in winter season which cannot be imaged ",
    images: [shoeImage, categoryBook, categoryTech],
    discountPrice: 400,
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
    setProductSize(size);
  };

  const handleAddQuantity = () => {
    if (totalProductsAvl - 1 != 0) {
      setProductQuantityAdded(productQuantityAdded + 1);
      setTotalProductsAvl(totalProductsAvl - 1);
    } else {
      window.alert("products end limits reached!");
    }
  };
  const handleQuantityLess = () => {
    if (productQuantityAdded <= 1) {
      setProductQuantityAdded(1);
    } else {
      setProductQuantityAdded(productQuantityAdded - 1);
      setTotalProductsAvl(totalProductsAvl + 1);
    }
  };

  const AddReview = () => {
    console.log(reviewData);
    setProductReviews((prev) => [...prev, reviewData]);
    setReviewData({
      name: "",
      data: "",
    });
  };

  const AddToCart = () => {
    if (productSize == null) {
      window.alert("Please select the size!");
    } else {
      // add to cart items using api call
      // window.alert("Add the CartItems Add API HERE");
      let updatedCartItems = [
        ...addItemsToCart,
        {
          id: Date.now(),
          userId: "userIdhere",
          productId,
          quantity: productQuantityAdded,
          size: productSize,
          imageUrl: "asdf",
          pName: productDetails.pName,
          discountedPrice: productDetails.discountPrice,
          originalPrice: productDetails.originalPrice,
        },
      ];
      setAddItemsToCart((prevCart) => {
        // Use the updated state directly in the callback
        // console.log(cookiesCartData.length);
        Cookies.set("cartItems", JSON.stringify(updatedCartItems), {
          expires: 7,
        });
        handleClick({ open: true, message: "Item Added Successfully !" });
        return updatedCartItems;
      });
    }
  };

  useEffect(() => {
    if (Cookies.get("cartItems") != undefined) {
      setTotalCartItems(JSON.parse(Cookies.get("cartItems")));
      console.log(JSON.parse(Cookies.get("cartItems")));
    }
  }, [addItemsToCart]); // This will run whenever addItemsToCart changes

  useEffect(() => {
    if (Cookies.get("cartItems") != undefined) {
      setAddItemsToCart(JSON.parse(Cookies.get("cartItems")));
      // console.log(JSON.parse(Cookies.get("cartItems")));
    }
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
                      key={index}
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
              ₹ {productDetails.discountPrice}
              <span>inclusive all taxes</span>
            </h2>
            <h2 className="cutoff price">
              ₹ {productDetails.originalPrice} <span>60% off</span>
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
                  <p>{productQuantityAdded}</p>
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
            {productReviews.map((data, index) => {
              return (
                <>
                  <div className="row">
                    <header>
                      <h1>{data.name}</h1>
                      <p>{data.time}</p>
                    </header>
                    <p className="review-desc">{data.data}</p>
                  </div>
                </>
              );
            })}
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
                value={reviewData.name}
                onChange={(e) =>
                  setReviewData({ ...reviewData, name: e.target.value })
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

export default SingleProductDetails;
