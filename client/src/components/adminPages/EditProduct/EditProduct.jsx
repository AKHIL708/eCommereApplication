import React, { useEffect, useState } from "react";
import "./EditProduct.scss";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { productId } = useParams();
  const [file, setFile] = useState(null);
  const [productDetails, setProductDetails] = useState({
    pName: "",
    category: "",
    Availability: "",
    originalPrice: "",
    mSizeAvl: "",
    lSizeAvl: "",
    sSizeAvl: "",
    xlSizeAvl: "",
    description: "",
    discountPrice: "",
    isBestDeal: "",
  });
  const {
    pName,
    category,
    Availability,
    originalPrice,
    description,
    discountPrice,
    isBestDeal,
    mSizeAvl,
    lSizeAvl,
    xlSizeAvl,
    sSizeAvl,
  } = productDetails;
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const fetchProductById = async (productId) => {
    try {
      let url = `${
        import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
      }/products/${productId}`;
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const error = await response.text();
        console.error(error);
        return;
      }

      const data = await response.json();
      if (data.message === "success") {
        console.log(data);
        setProductDetails(data.result[0]);
        setFile(data.result[0].images[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProductById(productId);
  }, []);
  return (
    <>
      <section id="edit-product">
        <header>
          <h1>Edit Product </h1>
        </header>

        <div className="inputs-container">
          <div className="col">
            <div className="row">
              <p>Product Name</p>
              <input
                type="text"
                placeholder="Product Name"
                value={pName}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    pName: e.target.value,
                  })
                }
              />
            </div>
            <div className="row">
              <p>Category</p>
              <input
                type="text"
                placeholder="category"
                value={category}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    category: e.target.value,
                  })
                }
              />
            </div>
            <div className="row">
              <p>Availability</p>
              <input
                type="text"
                placeholder="Availability"
                value={Availability}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    Availability: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <p>Original-Price</p>
              <input
                type="text"
                placeholder="original Price"
                value={originalPrice}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    originalPrice: e.target.value,
                  })
                }
              />
            </div>
            <div className="row">
              <p>discountedPrice</p>
              <input
                type="text"
                placeholder="discount price"
                value={discountPrice}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    discountPrice: e.target.value,
                  })
                }
              />
            </div>
            <div className="row">
              <p>description</p>
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="row">
              <p>isBestDeal</p>
              <input
                type="text"
                placeholder="Only Yes Or No"
                value={isBestDeal}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    isBestDeal: e.target.value,
                  })
                }
              />
            </div>
            <div className="row">
              <p>Images</p>
              <input
                type="file"
                placeholder="Select a file"
                onChange={handleFileChange}
              />
            </div>
            <div className="row">
              <button>Edit Product</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProduct;
