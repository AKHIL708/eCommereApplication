const { insert, getAll, getOne, DeleteRow } = require("../utils/dbFunctions");
const tableName = "products";

const addProduct = async (data) => {
  const result = await insert(tableName, data);
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

const getallProductsReviews = async (data) => {
  const result = await getAll("reviews", data);
  return result;
};

const getSingleProductDetails = async (data) => {
  try {
    const result = await getOne(tableName, data);
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
    const result = await getOne(tableName, data);
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
  try {
    const result = getOne(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in getProductsByCategory",
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
  getSingleProductReview,
};
