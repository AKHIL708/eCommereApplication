const {
  insert,
  insertMany,
  getAll,
  getDataBasedOnCondition,
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
    const result = await getDataBasedOnCondition(tableName, data);
    return result;
  } catch (error) {
    // Handle the error
    const errorResult = {
      message: "error in getOrdersByUserId",
      err: error.message,
      code: error.code,
      details: {
        tableName,
        data,
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
        data,
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
      message: "Error in addManyOrder",
      err: error.message,
      code: error.code,
      details: {
        tableName,
        data,
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
      message: "Error in updateOrder",
      err: error.message,
      code: error.code,
      details: {
        tableName,
        data,
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
