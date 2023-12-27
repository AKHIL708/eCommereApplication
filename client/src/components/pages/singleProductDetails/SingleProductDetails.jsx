import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
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

  const handleNotificationBar = ({ open, message, severity }) => {
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
  const [productReviews, setProductReviews] = useState([]);

  const [productDetails, setProductDetails] = useState([]);
  const [totalProductsAvl, setTotalProductsAvl] = useState(0);
  const [highLightImage, setHighLightImage] = useState(null);

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

  const AddToCart = () => {
    if (
      (productDetails[0].category == "clothes" ||
        productDetails[0].category == "womens-wear") &&
      productSize == null
    ) {
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
          imageUrl: highLightImage,
          pName: productDetails[0].pName,
          discountedPrice: productDetails[0].discountPrice,
          originalPrice: productDetails[0].originalPrice,
        },
      ];
      setAddItemsToCart((prevCart) => {
        // Use the updated state directly in the callback
        // console.log(cookiesCartData.length);
        Cookies.set("cartItems", JSON.stringify(updatedCartItems), {
          expires: 7,
        });
        handleNotificationBar({
          open: true,
          message: "Item Added Successfully !",
        });
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

  const fetchProductDetailsById = async () => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/products/${productId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("error fetching productdetails : ", error);
      return;
    }
    const data = await response.json();
    // let productImages = JSON.parse(data.result[0].images);
    let result = data.result;
    // console.log(result);
    setProductDetails(result);
    let productImages = JSON.parse(result[0].images);
    setHighLightImage(productImages[0]);
    setTotalProductsAvl(result[0].Availability);
  };
  const fetchProductReviewsById = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
      }/products/review/${productId}`,
      requestOptions
    );
    if (!response.ok) {
      const error = await response.text();
      console.log("error getting reviews :", error);
      return;
    }
    const data = await response.json();
    console.log(data);
    if (data.result == "no data found !") {
      setProductReviews([]);
    } else {
      setProductReviews(data.result);
    }
  };
  const AddProductReview = async () => {
    let userDetails;
    if (Cookies.get("userDetails") != undefined) {
      userDetails = JSON.parse(Cookies.get("userDetails"));
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // console.log(userDetails);
    var raw = JSON.stringify({
      id: uuid(),
      productId: productId,
      userId: userDetails.id,
      postedOn: createDateString(),
      userName: reviewData.name,
      description: reviewData.data,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/products/review/add`,
      requestOptions
    );
    if (!response.ok) {
      const error = await response.text();
      console.log("error getting reviews :", error);
      return;
    }
    const data = await response.json();
    if (data.message == "success") {
      console.log(data);
      fetchProductReviewsById();
      setReviewData({
        name: "",
        data: "",
      });
      handleNotificationBar({
        open: true,
        message: "review added successfully",
        severity: "success",
      });
    }
  };

  useEffect(() => {
    fetchProductDetailsById();
    fetchProductReviewsById();
    if (Cookies.get("cartItems") != undefined) {
      setAddItemsToCart(JSON.parse(Cookies.get("cartItems")));
      // console.log(JSON.parse(Cookies.get("cartItems")));
    }
  }, []);

  const createDateString = () => {
    let currDate = new Date();
    const date = currDate.getDate();
    const month = currDate.toLocaleString("default", { month: "long" });
    const year = currDate.getFullYear();

    let dateString = `${month} ${date} ${year} `;
    return dateString;
  };

  return (
    <>
      <ScrollToTop />
      <section id="product-details">
        {productDetails.length > 0 &&
          productDetails.map((data, index) => {
            let productImages = JSON.parse(data.images);
            // console.log(data.images);
            return (
              <div className="top-details">
                <div className="col">
                  <div
                    className="store-img"
                    style={{ backgroundImage: `url(${highLightImage})` }}
                  ></div>
                  <div className="diff-images">
                    {productImages.map((data, index) => {
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
                  <h1>{data.pName}</h1>
                  <p className="Desp">{data.description}</p>
                  <h2 className="price">
                    ₹ {data.discountPrice}
                    <span>inclusive all taxes</span>
                  </h2>
                  <h2 className="cutoff price">
                    ₹ {data.originalPrice} <span>60% off</span>
                  </h2>
                  {(data.category == "clothes" ||
                    data.category == "womens-wear") && (
                    <div className="size-selection">
                      <div
                        className={`size ${
                          selectColor === "S" ? "change-color" : ""
                        }`}
                        onClick={() => handleSizeClick("S")}
                      >
                        S
                      </div>
                      <div
                        className={`size ${
                          selectColor === "M" ? "change-color" : ""
                        }`}
                        onClick={() => handleSizeClick("M")}
                      >
                        M
                      </div>
                      <div
                        className={`size ${
                          selectColor === "L" ? "change-color" : ""
                        }`}
                        onClick={() => handleSizeClick("L")}
                      >
                        L
                      </div>
                      <div
                        className={`size ${
                          selectColor === "XL" ? "change-color" : ""
                        }`}
                        onClick={() => handleSizeClick("XL")}
                      >
                        XL
                      </div>
                    </div>
                  )}
                  <div className="quantity-to-buy">
                    <header>
                      <h1>Quantity</h1>
                    </header>
                    <div className="boxes">
                      <div className="box">
                        <p
                          className="icon"
                          onClick={() => handleQuantityLess()}
                        >
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
            );
          })}

        <div className="product-reviews">
          <header>
            <h1>Product Reviews</h1>
          </header>
          <div className="reviews">
            {productReviews.length > 0 ? (
              <>
                {productReviews.map((data, index) => {
                  return (
                    <>
                      <div className="row">
                        <header>
                          <h1>{data.userName}</h1>
                          <p>{data.postedOn}</p>
                        </header>
                        <p className="review-desc">{data.description}</p>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <h1>No Reviews To show</h1>
              </>
            )}
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
              <button onClick={() => AddProductReview()}>Submit</button>
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
