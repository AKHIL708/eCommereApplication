const {
  insert,
  getAll,
  getDataBasedOnCondition,
  update,
  DeleteRow,
} = require("../utils/dbFunctions");
const tableName = "products";

const addProduct = async (data, imageUrl) => {
  let id = Date.now();
  const finalData = { ...data, images: imageUrl, id: id };
  const result = await insert(tableName, finalData);
  return result;
};

const addProductReview = async (data) => {
  const result = await insert("reviews", data);
  return result;
};

const getAllProducts = async () => {
  const result = await getAll(tableName);
  return result;
};

const getBestDealProducts = async (data) => {
  const result = await getDataBasedOnCondition(tableName, data);
  return result;
};

const getallProductsReviews = async (data) => {
  const result = await getDataBasedOnCondition("reviews", data);
  return result;
};

const getSingleProductDetails = async (data) => {
  try {
    const result = await getDataBasedOnCondition(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in getSingleProductDetails",
      err: error.message,
      code: error.code,
      details: {
        tableName,
        condition,
      },
    };
    return errorResult;
  }
};

const getSingleProductReview = async (data) => {
  try {
    const result = await getDataBasedOnCondition(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in getSingleProductReview",
      err: error.message,
      code: error.code,
      details: {
        tableName,
        condition,
      },
    };
    return errorResult;
  }
};

const getProductsByCategory = async (data) => {
  const result = await getDataBasedOnCondition(tableName, data);
  return result;
};

const updateProducts = async (data, id) => {
  const result = update(tableName, data, id);
  return result;
};

const deleteProduct = async (data) => {
  try {
    const result = DeleteRow(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in deleteProduct",
      err: error.message,
      code: error.code,
      details: {
        tableName,
        condition,
      },
    };
    return errorResult;
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  getSingleProductDetails,
  deleteProduct,
  getallProductsReviews,
  addProductReview,
  getBestDealProducts,
  getSingleProductReview,
  updateProducts,
};
