import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55vw",
  bgcolor: "background.paper",
  border: "unset",
  boxShadow: 24,
  p: 1,
};
function Dashboard() {
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

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: "",
    pName: "",
    url: "",
  });
  const [productImage, setProductImage] = useState("");

  const handleOpenModal = (data, id) => {
    setOpenModal(true);
    let url = JSON.parse(data.images);
    setModalData({
      id: data.id,
      pName: data.pName,
      url,
    });
    console.log(data, id);
  };
  const handleCloseModal = () => setOpenModal(false);

  const navigate = useNavigate();
  let tableHeaderData = ["No.", "productName", "Aval", "edit", "Delete"];
  const [allProducts, setAllProducts] = useState(null);

  const fetchAllProducts = async () => {
    try {
      let url = `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/products`;
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
        setAllProducts(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteProduct = async (productId) => {
    let url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/products/delete/${productId}`;
    let requestOptions = {
      method: "POST",
      follow: "redirect",
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }

    const data = await response.json();
    if (data.message === "success") {
      handleNotificationBar({
        open: true,
        severity: "success",
        message: "Deleted successfully .",
      });
      handleCloseModal();
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <section id="dashboard">
        <header>
          <h1>Products</h1>
          <button onClick={() => navigate("/admin/product/add")}>
            Add Product +
          </button>
        </header>
        <section className="products-table-container">
          <div className="table-header">
            {tableHeaderData.map((data, index) => {
              return (
                <div className="row">
                  <h1>{data}</h1>
                </div>
              );
            })}
          </div>
          <div className="table-data">
            {allProducts !== null ? (
              <>
                {allProducts.map((data, index) => {
                  return (
                    <div className="col">
                      <div className="row">
                        <h1>{index}</h1>
                      </div>
                      <div className="row">
                        <h1>{data.pName}</h1>
                      </div>
                      <div className="row">
                        <h1
                          className={` ${
                            data.Availability < 1 ? "add-red-colour" : ""
                          } `}
                        >
                          {data.Availability}
                        </h1>
                      </div>
                      <div className="row">
                        <h1
                          onClick={() =>
                            navigate(`/admin/product/edit/${data.id}`)
                          }
                        >
                          <EditIcon className="edit" />
                        </h1>
                      </div>
                      <div className="row">
                        <h1 onClick={() => handleOpenModal(data)}>
                          <DeleteIcon className="delete" />
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <h1>Loadings .....</h1>
            )}
          </div>
        </section>
      </section>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="modal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
          <header>
            <p>Are You Sure </p>
          </header>

          <div className="container">
            <div
              className="store-img"
              style={{
                backgroundImage: `url(${modalData.url})`,
              }}
            ></div>
            <h1>{modalData.pName}</h1>
          </div>
          <div className="buttons">
            <button onClick={() => DeleteProduct(modalData.id)}>Delete</button>
            <button onClick={() => handleCloseModal()}>Go Back</button>
          </div>
        </Box>
      </Modal>
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

export default Dashboard;
