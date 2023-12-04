const router = require("express").Router();
const {
  addOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  addManyOrder,
} = require("../models/orders.models");
const { getSingleProductDetails } = require("../models/products.model");
const handleErorrAndResponse = require("../utils/errorHandlingResponse");

router.get("/", async (req, res) => {
  const result = await getAllOrders();
  handleErorrAndResponse(result, res);
});

router.get("/user/:userId", async (req, res) => {
  const result = await getOrdersByUserId([
    {
      column: "userId",
      value: req.params.userId,
    },
  ]);
  handleErorrAndResponse(result, res);
});

router.post("/add", async (req, res) => {
  const productExist = await getSingleProductDetails([
    {
      column: "id",
      value: req.body.productId,
    },
  ]);
  if (!(productExist == null)) {
    const result = await addOrder(
      ({
        id,
        productId,
        userId,
        placedTimeAt,
        modeOfPayment,
        orderStatus,
        quantity,
      } = req.body)
    );
    handleErorrAndResponse(result, res);
  } else {
    res.status(500).json({
      message: `product not found!`,
      result: "failure",
    });
  }
});

router.post("/addMany", async (req, res) => {
  const productExist = await getSingleProductDetails([
    {
      column: "id",
      value: req.body[0].productId,
    },
  ]);
  if (!(productExist == null)) {
    const result = await addManyOrder(req.body);
    handleErorrAndResponse(result, res);
  } else {
    res.status(500).json({
      message: `product not found!`,
      result: "failure",
    });
  }
});
router.post("/update/:orderId", async (req, res) => {
  const result = await updateOrder(
    [
      {
        column: "orderStatus",
        value: "success",
      },
    ],
    req.params.orderId
  );
  handleErorrAndResponse(result, res);
});

module.exports = router;
