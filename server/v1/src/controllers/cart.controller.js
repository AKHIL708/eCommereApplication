const router = require("express").Router();
const {
  getAllCartItems,
  updateCartItem,
  deleteCartItem,
  getCartItemsByUserId,
  addCartItem,
} = require("../models/cart.models");
const handleErorrAndResponse = require("../utils/errorHandlingResponse");

router.get("/", async (req, res) => {
  const result = await getAllCartItems();
  handleErorrAndResponse(result, res);
});

router.get("/user/:userId", async (req, res) => {
  const result = await getCartItemsByUserId([
    {
      column: "userId",
      value: req.params.userId,
    },
  ]);
  handleErorrAndResponse(result, res);
});

router.post("/add", async (req, res) => {
  const result = await addCartItem(({ id, userId, productId } = req.body));
  handleErorrAndResponse(result, res);
});

router.post("/delete/:cartId", async (req, res) => {
  const result = await deleteCartItem([
    {
      column: "id",
      value: req.params.cartId,
    },
  ]);
  handleErorrAndResponse(result, res);
});

module.exports = router;
