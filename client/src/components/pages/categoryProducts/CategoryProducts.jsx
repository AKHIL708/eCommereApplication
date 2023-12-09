import React, { useEffect } from "react";
import shoesImages from "../../../assets/images/category-shoes.jpg";
import "./CategoryProducts.scss";
import { useNavigate, useParams } from "react-router-dom";

function CategoryProducts() {
  const { categorySelected } = useParams();
  const navigate = useNavigate();
  const todaysBest = [
    {
      id: 12,
      url: shoesImages,
      pName: "Air Jordan",
      price: "$2500",
      desc: "so comfortable to wear and run",
      rating: "create",
    },
    {
      id: 85456,
      url: shoesImages,
      pName: "Air Jordan",
      price: "$2500",
      desc: "so comfortable to wear and run",
      rating: "create",
    },
    {
      id: 800000845,
      url: shoesImages,
      pName: "Air Jordan",
      price: "$2500",
      desc: "so comfortable to wear and run",
      rating: "create",
    },
    {
      id: 800000845,
      url: shoesImages,
      pName: "Air Jordan",
      price: "$2500",
      desc: "so comfortable to wear and run",
      rating: "create",
    },
    {
      id: 800000845,
      url: shoesImages,
      pName: "Air Jordan",
      price: "$2500",
      desc: "so comfortable to wear and run",
      rating: "create",
    },
    {
      id: 800000845,
      url: shoesImages,
      pName: "Air Jordan",
      price: "$2500",
      desc: "so comfortable to wear and run",
      rating: "create",
    },
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional, adds smooth scrolling
    });
  }, []);

  return (
    <>
      <section id="category-product">
        <header>
          <h1>Category/{categorySelected}</h1>
        </header>
        <div className="deal-boxes">
          {todaysBest.map((data, index) => {
            return (
              <>
                <div
                  className="deal-box"
                  onClick={() => navigate(`/productDetail/${data.id}`)}
                >
                  <div
                    className="store-img"
                    style={{ backgroundImage: `url(${data.url})` }}
                  ></div>
                  <div className="details">
                    <div className="name-and-price">
                      <h1>{data.pName}</h1>
                      <p>{data.price}</p>
                    </div>
                    <p className="desc">{data.desc}</p>
                    <p>{data.rating}</p>
                    <button>Add to Cart</button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default CategoryProducts;
