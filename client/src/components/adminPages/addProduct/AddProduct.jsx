import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./AddProduct.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddProduct() {
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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  const [productDeatils, setProductDetails] = useState({
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
  } = productDeatils;

  const handleAddProduct = async (e) => {
    console.log(isBestDeal != "yes");
    e.preventDefault();

    if (
      pName.length < 3 ||
      category.length < 3 ||
      Availability == "" ||
      originalPrice.length < 3 ||
      discountPrice.length < 3 ||
      description.length < 12
    ) {
      handleNotificationBar({
        open: true,
        message: "Invalid Input Enter Properly",
        severity: "error",
      });
      return;
    }

    if (isBestDeal !== "yes" && isBestDeal !== "no") {
      handleNotificationBar({
        open: true,
        message: "best deal can only be yes or no",
        severity: "error",
      });
      return;
    }

    if (!file) {
      handleNotificationBar({
        open: true,
        message: "select a file",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("pName", pName);
    formData.append("category", category);
    formData.append("availability", Number(Availability));
    formData.append("originalPrice", originalPrice);
    // formData.append("mSizeAvl", mSizeAvl);
    // formData.append("lSizeAvl", lSizeAvl);
    // formData.append("sSizeAvl", sSizeAvl);
    // formData.append("xlSizeAvl", xlSizeAvl);
    formData.append("description", description);
    formData.append("images", file);
    formData.append("discountPrice", discountPrice);
    formData.append("isBestDeal", isBestDeal);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };
    let url = `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/products/add`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }

    const data = await response.json();
    console.log(data);
    if (data.message == "success") {
      handleNotificationBar({
        open: true,
        severity: "success",
        message: "product Added Successfully.",
      });
      window.alert("Product Added");
      setProductDetails({
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
      setFile(null);
      navigate("/admin/dashboard");
    }
  };
  return (
    <>
      <section id="add-product">
        <header>
          <h1>Add Product</h1>
        </header>
        <div className="inputs-container">
          <form onSubmit={handleAddProduct}>
            <div className="col">
              <div className="row">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={pName}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDeatils,
                      pName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  placeholder="category"
                  value={category}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDeatils,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  placeholder="Availability"
                  value={Availability}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDeatils,
                      Availability: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col">
              <div className="row">
                <input
                  type="text"
                  placeholder="original Price"
                  value={originalPrice}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDeatils,
                      originalPrice: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  placeholder="discount price"
                  value={discountPrice}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDeatils,
                      discountPrice: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDeatils,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col">
              <div className="row">
                <input
                  type="text"
                  placeholder="Only Yes Or No"
                  value={isBestDeal}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDeatils,
                      isBestDeal: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <input
                  type="file"
                  placeholder="Select a file"
                  onChange={handleFileChange}
                />
                {/* <div>Selected File: {fileName}</div> */}
              </div>
              <div className="row">
                <button onClick={() => handleAddProduct()}>Add Product</button>
              </div>
            </div>
          </form>
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

export default AddProduct;
