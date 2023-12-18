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
const fireBaseApp = require("../utils/fireBaseConfig.js");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  listAll,
} = require("firebase/storage");

const multer = require("multer");
const storage = getStorage(fireBaseApp);

// Multer Configuration
const storageMulter = multer.memoryStorage();
const upload = multer({ storage: storageMulter });

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

router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const downloadURLs = await Promise.all(
      req.files.map(async (file) => {
        const { downloadURL, contentType } = await uploadToFirebase(file);
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", "inline; filename=image.jpg");
        return downloadURL;
      })
    );
    const data = req.body;
    const result = await addProduct(data, downloadURLs);
    handleErorrAndResponse(result, res);
  } catch (err) {
    res.status(500).json({ err, error: "Internal Server Error" });
  }
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

const uploadToFirebase = async (file) => {
  const storageRef = ref(storage, `images/${file.originalname}`);
  await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(storageRef);

  // Optionally, set headers for inline display
  const metadata = await getMetadata(storageRef);
  const contentType = metadata.contentType;

  return {
    downloadURL,
    contentType,
  };
};

module.exports = router;
