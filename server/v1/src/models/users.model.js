const {
  insert,
  getAll,
  getOne,
  update,
  DeleteRow,
} = require("../utils/dbFunctions");
let tableName = "users";

const addUser = async (data) => {
  const result = await insert(tableName, data);
  return result;
};

const getAllUsers = async () => {
  const result = await getAll(tableName);
  return result;
};
const getOneUser = async (data) => {
  const result = getOne(tableName, data);
  return result;
};
const updateUser = async (data, id) => {
  const result = update(tableName, data, id);
  return result;
};
const deleteUser = async (data) => {
  const result = DeleteRow(tableName, data);
  return result;
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
