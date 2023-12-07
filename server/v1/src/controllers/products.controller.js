const router = require("express").Router();
const {
  addProduct,
  addProductReview,
  getAllProducts,
  getallProductsReviews,
  getBestDealProducts,
  getSingleProductDetails,
  getSingleProductReview,
  getProductsByCategory,
  deleteProduct,
} = require("../models/products.model");
const handleErorrAndResponse = require("../utils/errorHandlingResponse");
const multer = require("multer");
//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "../components/photos/");
  },
});
const upload = multer({
  storage: multerStorage,
});

// id varchar(200) PK
// name varchar(150)
// category varchar(150)
// Availability int
// price int
// mSizeAvl int
// lSizeAvl int
// sSizeAvl int
// xlSizeAvl int
// description varchar(300)
// images

router.get("/", async (req, res) => {
  const result = await getAllProducts();
  handleErorrAndResponse(result, res);
});

router.get("/bestDeals/:isBestDeal", async (req, res) => {
  const result = await getBestDealProducts([
    {
      column: "isBestDeal",
      value: req.params.isBestDeal,
    },
  ]);
  handleErorrAndResponse(result, res);
});

router.get("/:productId", async (req, res) => {
  const result = await getSingleProductDetails([
    {
      column: "id",
      value: req.params.productId,
    },
  ]);
  //   console.log("result is : " , result);
  handleErorrAndResponse(result, res);
});

router.get("/singleReview/:reviewId", async (req, res) => {
  const result = await getSingleProductReview([
    {
      column: "id",
      value: req.params.reviewId,
    },
  ]);
  handleErorrAndResponse(result, res);
});

router.get("/review/:productId", async (req, res) => {
  const result = await getallProductsReviews([
    {
      column: "productId",
      value: req.params.productId,
    },
  ]);
  handleErorrAndResponse(result, res);
});

router.get("/getByCategory/:categoryVal", async (req, res) => {
  const result = await getProductsByCategory([
    {
      column: "category",
      value: req.params.categoryVal,
    },
  ]);
  handleErorrAndResponse(result, res);
});

router.post("/add", async (req, res) => {
  const result = await addProduct(
    ({
      id,
      pName,
      category,
      Availability,
      originalPrice,
      mSizeAvl,
      lSizeAvl,
      sSizeAvl,
      xlSizeAvl,
      description,
      images,
      discountPrice,
    } = req.body)
  );
  handleErorrAndResponse(result, res);
});
router.post("/review/add", async (req, res) => {
  const result = await addProductReview(
    ({ id, productId, userId, postedOn, description } = req.body)
  );
  handleErorrAndResponse(result, res);
});

router.post("/delete/:productId", async (req, res) => {
  const result = await deleteProduct([
    {
      column: "id",
      value: req.params.productId,
    },
  ]);
  handleErorrAndResponse(result, res);
});

module.exports = router;
