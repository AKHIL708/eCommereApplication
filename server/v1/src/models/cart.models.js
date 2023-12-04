const {
  insert,
  update,
  DeleteRow,
  getAll,
  getOne,
} = require("../utils/dbFunctions");
const tableName = "cart";

const getAllCartItems = async () => {
  const result = await getAll(tableName);
  return result;
};

const getCartItemsByUserId = async (data) => {
  const result = await getOne(tableName, data);
  return result;
};

const addCartItem = async (data) => {
  const result = await insert(tableName, data);
  return result;
};
const updateCartItem = async (data, id) => {
  const result = await update(tableName, data, id);
  return result;
};
const deleteCartItem = async (data) => {
  const result = await DeleteRow(tableName, data);
  return result;
};

module.exports = {
  getAllCartItems,
  addCartItem,
  updateCartItem,
  getCartItemsByUserId,
  deleteCartItem,
};
