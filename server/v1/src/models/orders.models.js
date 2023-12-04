const {
  insert,
  insertMany,
  getAll,
  getOne,
  update,
} = require("../utils/dbFunctions");
const tableName = "orders";

const getAllOrders = async () => {
  try {
    const result = await getAll(tableName);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in getAllOrders",
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

const getOrdersByUserId = async (data) => {
  try {
    const result = await getOne(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in getAllOrders",
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

const addOrder = async (data) => {
  try {
    const result = await insert(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in addOrder",
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

const addManyOrder = async (data) => {
  try {
    const result = await insertMany(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "Error in addOrder",
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

const updateOrder = async (data, id) => {
  try {
    const result = await update(tableName, data, id);
    return result;
  } catch (error) {
    const errorResult = {
      message: "Error in addOrder",
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
  getAllOrders,
  addOrder,
  addManyOrder,
  getOrdersByUserId,
  updateOrder,
};
