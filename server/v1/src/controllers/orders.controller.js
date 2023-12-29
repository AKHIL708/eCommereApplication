const router = require("express").Router();
const {
  addOrder,
  getAllOrders,
  getOrdersByUserId,
  getOrderByGroupedOrderId,
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

router.get("/user/placedOrders/:groupedOrderId", async (req, res) => {
  const result = await getOrderByGroupedOrderId([
    {
      column: "groupedOrderId",
      value: req.params.groupedOrderId,
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
router.post("/update", async (req, res) => {
  const { data, id } = req.body;
  const result = await updateOrder(data, id);
  handleErorrAndResponse(result, res);
});

module.exports = router;
