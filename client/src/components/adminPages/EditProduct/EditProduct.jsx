import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./EditProduct.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditProduct() {
  const [state, setState] = useState({
    open: false,
    message: "hello",
    severity: "success",
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open, message, severity } = state;

  const handleNotificationBar = ({ open, message, severity }) => {
    // console.log(message, open, severity);
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

  // above handliing the snack bar

  const navigate = useNavigate();
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
  const EditProduct = async () => {
    let url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/products/update`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: productId,
      data: [
        {
          column: "pName",
          value: pName,
        },
        {
          column: "category",
          value: category,
        },
        {
          column: "Availability",
          value: Availability,
        },
        {
          column: "originalPrice",
          value: originalPrice,
        },
        {
          column: "discountPrice",
          value: discountPrice,
        },
        {
          column: "description",
          value: description,
        },
        {
          column: "isBestDeal",
          value: isBestDeal,
        },
      ],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      return;
    }

    const data = await response.json();
    if (data.message == "success") {
      handleNotificationBar({
        open: true,
        severity: "success",
        message: "Updated Successfully",
      });
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
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
          <p>* Edit Images function need to be add</p>
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
              <button onClick={() => EditProduct()}>Edit Product</button>
            </div>
          </div>
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

export default EditProduct;
