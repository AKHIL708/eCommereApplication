import React, { useEffect, useState } from "react";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./AllCustomerOrder.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  border: "unset",
  boxShadow: 24,
  p: 1,
};
function AllCustomerOrders() {
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
    UserName: "",
    groupedOrderId: "",
    orderStatus: "",
  });

  const handleOpenModal = async (pName, data) => {
    setOpenModal(true);

    // let url = JSON.parse(data.images);
    let UserName = await fetchUserById(data.userId);
    
    setModalData({
      id: data.id,
      pName,
      UserName: UserName.firstName,
      orderStatus: data.orderStatus,
      groupedOrderId: data.groupedOrderId,
      address: UserName.address,
    });
    // console.log(UserName, data);
  };
  const handleCloseModal = () => setOpenModal(false);

  const [orderHistoryData, setOrderHistoryData] = useState(null);

  const [particularOrderHistory, setParticularOrderHistory] = useState({
    show: false,
    data: [],
    productDetails: null,
  });
  const fetchAllOrders = async () => {
    let url = `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/orders`;
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
      //   console.log(data.result);
      let result = data.result;
      const groupedItems = result.reduce((groups, item) => {
        const groupedOrderId = item.groupedOrderId;
        groups[groupedOrderId] = groups[groupedOrderId] || [];
        groups[groupedOrderId].push(item);
        return groups;
      }, {});
      //   console.log(groupedItems);
      setOrderHistoryData(groupedItems);
    }
  };
  const fetchSingleOrderHistory = async (groupedOrderId) => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/orders/user/placedOrders/${groupedOrderId}`;
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }
    let data = await response.json();
    if (data.message == "success") {
      console.log(data);

      let storeOrderHistoryProductDetails = [];
      for (let i = 0; i < data.result.length; i++) {
        storeOrderHistoryProductDetails.push(
          fetchProductDetails(data.result[i].productId)
        );
      }

      // wait until all promises are resolved ...
      const resolvedProductDetails = await Promise.all(
        storeOrderHistoryProductDetails
      );

      setParticularOrderHistory({
        ...particularOrderHistory,
        show: true,
        data: data.result,
        productDetails: resolvedProductDetails,
      });

      // setOrderHistoryProductDetails(resolvedProductDetails);
    }
  };

  const fetchProductDetails = async (productId) => {
    let url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/products/${productId}`;
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }
    let data = await response.json();
    if (data.message == "success") {
      console.log(data);
      return data.result[0];
    }
  };

  const fetchUserById = async (userId) => {
    let url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/users/${userId}`;
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }
    let data = await response.json();
    if ((data.message = "success")) {
      let result = data.result[0];
      //   setModalData({
      //     ...modalData,
      //   });
      return result;
    }
  };
  const updateOrderProductStatus = async (orderStatus) => {
    let url = `${
      import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
    }/orders/update`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: modalData.id,
      data: [
        {
          column: "orderStatus",
          value: orderStatus,
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
      console.error(error);
      return;
    }
    let data = await response.json();
    if (data.message == "success") {
      handleNotificationBar({
        open: "true",
        message: "Updated successfully",
        severity: "success",
      });
      handleCloseModal();
      fetchSingleOrderHistory(modalData.groupedOrderId);
      console.log(data);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
      <section id="all-customer-orders">
        <header>
          <h1>All Orders</h1>
        </header>

        <div className="show-all-orders">
          {!particularOrderHistory.show && (
            <>
              {" "}
              <section id="order-history">
                {orderHistoryData != null ? (
                  <>
                    {Object.entries(orderHistoryData).map(
                      ([groupedOrderId, items]) => (
                        <div
                          key={groupedOrderId}
                          onClick={() =>
                            fetchSingleOrderHistory(groupedOrderId)
                          }
                          className="order-history-card"
                        >
                          {/* Render details only once for each groupedOrderId */}
                          {items.length > 0 && (
                            <>
                              <div className="row">
                                <h1>Order Id</h1>
                                <h2>:</h2>
                                <p>{items[0].id}</p>
                              </div>
                              <div className="row">
                                <h1>Total Product </h1>
                                <h2>:</h2>
                                <p>{items.length}</p>
                              </div>
                              <div className="row">
                                <h1>Total Price </h1>
                                <h2>:</h2>
                                <p>{items[0].totalPriceValue}</p>
                              </div>
                              <div className="row">
                                <h1>MOD </h1>
                                <h2>:</h2>
                                <p>{items[0].modeOfPayment}</p>
                              </div>
                              <div className="row">
                                <h1>Placed On </h1>
                                <h2>:</h2>
                                <p>{items[0].placedTimeAt}</p>
                              </div>
                            </>
                          )}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <h1>No order history</h1>
                  </>
                )}
              </section>
            </>
          )}
          {particularOrderHistory.show && (
            <>
              <div id="product-history-cards">
                {particularOrderHistory.data.map((data, index) => {
                  let image = JSON.parse(
                    particularOrderHistory.productDetails[index].images
                  );
                  // console.log(image);
                  return (
                    <>
                      <div className="history-card">
                        <div
                          className="edit-card"
                          onClick={() =>
                            handleOpenModal(
                              particularOrderHistory.productDetails[index]
                                .pName,
                              data
                            )
                          }
                        >
                          <Edit className="edit-icon" />
                        </div>
                        <div className="col">
                          <div
                            className="store-img"
                            onClick={() =>
                              navigate(
                                `/productDetail/${particularOrderHistory.productDetails[index].id}`
                              )
                            }
                            style={{ backgroundImage: `url(${image[0]})` }}
                          ></div>
                        </div>
                        <div className="col">
                          {" "}
                          <div className="row">
                            <h1>pname </h1>
                            <span>:</span>
                            <p>
                              {
                                particularOrderHistory.productDetails[index]
                                  .pName
                              }
                            </p>
                          </div>
                          <div className="row">
                            <h1>MOD </h1>
                            <span>:</span>
                            <p>{data.modeOfPayment}</p>
                          </div>
                          <div className="row">
                            <h1>status </h1>
                            <span>:</span>
                            <p>{data.orderStatus}</p>
                          </div>
                          <div className="row">
                            <h1>quantity </h1>
                            <span>:</span>

                            <p>{data.quantity}</p>
                          </div>
                          <div className="row">
                            <h1>Price </h1>
                            <span>:</span>
                            <p>
                              {
                                particularOrderHistory.productDetails[index]
                                  .discountPrice
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="back-btn">
                  <button
                    onClick={() =>
                      setParticularOrderHistory({
                        ...particularOrderHistory,
                        show: false,
                      })
                    }
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
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
            <p>Update Status </p>
          </header>

          <div className="container">
            <div className="row">
              <h1>id</h1>
              <span>:</span>
              <h1>{modalData.id}</h1>
            </div>
            <div className="row">
              <h1>pName</h1>
              <span>:</span>
              <h1>{modalData.pName}</h1>
            </div>
            <div className="row">
              <h1>User Name</h1>
              <span>:</span>
              <h1>{modalData.UserName}</h1>
            </div>
            <div className="row">
              <h1>Address</h1>
              <span>:</span>
              <h1>{modalData.address}</h1>
            </div>
            <div className="row">
              <h1>orderStatus</h1>
              <span>:</span>
              <h1>{modalData.orderStatus}</h1>
            </div>
          </div>
          <div className="buttons">
            <button
              value={"pending"}
              className={`${
                modalData.orderStatus == "pending" ? "disable-btn" : ""
              }`}
              onClick={(e) => updateOrderProductStatus(e.target.value)}
            >
              pending
            </button>
            <button
              value={"dispatched"}
              className={`${
                modalData.orderStatus == "dispatched" ? "disable-btn" : ""
              }`}
              onClick={(e) => updateOrderProductStatus(e.target.value)}
            >
              dispatched
            </button>
            <button
              value={"delivered"}
              className={`${
                modalData.orderStatus == "delivered" ? "disable-btn" : ""
              }`}
              onClick={(e) => updateOrderProductStatus(e.target.value)}
            >
              delivered
            </button>
            <button
              value={"failed"}
              className={`${
                modalData.orderStatus == "failed" ? "disable-btn" : ""
              }`}
              onClick={(e) => updateOrderProductStatus(e.target.value)}
            >
              failed
            </button>
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

export default AllCustomerOrders;
