import React, { useEffect, useState } from "react";
import shoesImages from "../../../assets/images/category-shoes.jpg";
import "./CategoryProducts.scss";
import { useNavigate, useParams } from "react-router-dom";

function CategoryProducts() {
  const { categorySelected } = useParams();
  const navigate = useNavigate();
  const todaysBest = [
    {
      id: "1703010249144",
      pName: "JUGULAR Cargo Black Track Pants",
      category: "clothes",
      Availability: 2,
      originalPrice: 3000,
      mSizeAvl: 1,
      lSizeAvl: 0,
      sSizeAvl: 1,
      xlSizeAvl: 0,
      description:
        "JUGULAR Men's Cotton Solid Men Stylish Cargo Black Track Pants",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/ecommerceapplication-2a15d.appspot.com/o/images%2F3.0.jpg?alt=media&token=efeb6992-9b04-4de4-a7a9-d738210de824",
        "https://firebasestorage.googleapis.com/v0/b/ecommerceapplication-2a15d.appspot.com/o/images%2F3.1.jpg?alt=media&token=4acd75b2-77ce-4808-888d-ccd453949989",
      ],
      discountPrice: 599,
      isBestDeal: "yes",
    },
  ];
  const [categoryProducts, setCategoryProducts] = useState([]);

  const fetchCategorySelectedProducts = async () => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/products/getByCategory/${categorySelected}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Error fetching products:", error);
      return;
    }

    const data = await response.json();
    console.log(data);
    if (data.result == "no data found !") {
      setCategoryProducts(null);
    } else {
      setCategoryProducts(data.result);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional, adds smooth scrolling
    });
    fetchCategorySelectedProducts();
  }, []);

  return (
    <>
      <section id="category-product">
        <header>
          <h1>Category/{categorySelected}</h1>
        </header>
        <div className="deal-boxes">
          {categoryProducts == null ? (
            <>
              <h1>no data to show</h1>
            </>
          ) : (
            <>
              {" "}
              {categoryProducts.length > 0 &&
                categoryProducts.map((data, index) => {
                  const images = JSON.parse(data.images);
                  return (
                    <>
                      <div
                        className="deal-box"
                        onClick={() => navigate(`/productDetail/${data.id}`)}
                      >
                        <div
                          className="store-img"
                          style={{ backgroundImage: `url(${images[0]})` }}
                        ></div>
                        <div className="details">
                          <div className="name-and-price">
                            <h1>
                              {data.pName.length > 10
                                ? data.pName.substring(0, 15) + "..."
                                : data.pName}
                            </h1>
                            <p>₹{data.discountPrice}</p>
                          </div>
                          <p className="desc">{data.description}</p>
                          {/* <p>{data.}</p> */}
                          <button>Add to Cart</button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default CategoryProducts;
