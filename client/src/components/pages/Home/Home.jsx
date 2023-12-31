import React, { useEffect, useState } from "react";
import homeHeaderImage from "../../../assets/images/shoeImage.png";
import booksImage from "../../../assets/images/category-books.jpg";
import clothesImages from "../../../assets/images/category-Clothes.jpg";
import shoesImages from "../../../assets/images/category-shoes.jpg";
import womensWear from "../../../assets/images/womens-wear.jpg";
import slippersImages from "../../../assets/images/category-slippers.jpg";
import techImages from "../../../assets/images/category-tech.jpg";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import("./Home.scss");

function Home() {
  const navigate = useNavigate();
  const categoryImageData = [
    {
      id: 100,
      url: booksImage,
      category: "books",
    },
    {
      id: 100,
      url: clothesImages,
      category: "clothes",
    },
    {
      id: 100,
      url: techImages,
      category: "tech",
    },
    {
      id: 100,
      url: womensWear,
      category: "womens-wear",
    },
  ];

  // const todaysBest = [
  //   {
  //     id: 12,
  //     url: shoesImages,
  //     pName: "Air Jordan",
  //     price: "$2500",
  //     desc: "so comfortable to wear and run",
  //     rating: "create",
  //   },
  //   {
  //     id: 85456,
  //     url: shoesImages,
  //     pName: "Air Jordan",
  //     price: "$2500",
  //     desc: "so comfortable to wear and run",
  //     rating: "create",
  //   },
  //   {
  //     id: 800000845,
  //     url: shoesImages,
  //     pName: "Air Jordan",
  //     price: "$2500",
  //     desc: "so comfortable to wear and run",
  //     rating: "create",
  //   },
  //   {
  //     id: 800000845,
  //     url: shoesImages,
  //     pName: "Air Jordan",
  //     price: "$2500",
  //     desc: "so comfortable to wear and run",
  //     rating: "create",
  //   },
  //   {
  //     id: 800000845,
  //     url: shoesImages,
  //     pName: "Air Jordan",
  //     price: "$2500",
  //     desc: "so comfortable to wear and run",
  //     rating: "create",
  //   },
  //   {
  //     id: 800000845,
  //     url: shoesImages,
  //     pName: "Air Jordan",
  //     price: "$2500",
  //     desc: "so comfortable to wear and run",
  //     rating: "create",
  //   },
  // ];

  const [todaysBestDeals, setTodaysBestDeals] = useState([]);
  const fetchBestDealsProducts = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/products/bestDeals/yes`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error("error getting deals : ", error);
      return;
    }
    const data = await response.json();
    console.log(data);
    if (data.message == "success") {
      setTodaysBestDeals(data.result);
    }
  };

  useEffect(() => {
    AOS.init();
    fetchBestDealsProducts();
  }, []);
  return (
    <>
      <section id="Home">
        <header>
          <div className="col">
            <div className="heading">
              <h1>AK007 Simple Shopping Solution</h1>
            </div>
            <div className="para">
              <p>
                Shopping is a bit of a relaxing hobby for me, which is sometimes
                troubling for the bank balance.
              </p>
            </div>
            <div
              className="button"
              // data-aos="fade-right"
              // data-aos-duration="1500"
            >
              <button>Learn More</button>
            </div>
          </div>
          <div className="col">
            <div
              className="image "
              data-aos="fade-left"
              data-aos-duration="2200"
            >
              <img src={homeHeaderImage} alt="" />
            </div>{" "}
          </div>
        </header>
        <section className="shop-our-top-category">
          <header data-aos="fade-left" data-aos-duration="1500">
            <h1>Our Top Categories</h1>
          </header>
          <section
            className="category-boxes"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            {categoryImageData.map((data, index) => {
              index = index + 1;
              // console.log(index);
              return (
                <>
                  <div
                    className="category-box"
                    style={{ backgroundImage: `url(${data.url})` }}
                    onClick={() => navigate(`/category/${data.category}`)}
                  >
                    <h1>{data.category}</h1>
                  </div>
                </>
              );
            })}
          </section>
        </section>

        <section className="todays-best-deals">
          <header>
            <h1>Todays Best Deals For You!</h1>
          </header>
          <div className="deal-boxes">
            {todaysBestDeals.map((data, index) => {
              let images = JSON.parse(data.images);
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
                          {data.pName.length > 12
                            ? data.pName.substring(0, 12) + "..."
                            : data.pName}
                        </h1>
                        <p>₹{data.originalPrice}</p>
                      </div>
                      <p className="desc">
                        {data.description.length > 30
                          ? data.description.substring(0, 50) + "..."
                          : data.description}
                      </p>
                      {/* <p>{data.rating}</p> */}
                      <button>Add to Cart</button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
}

export default Home;
