const { insert, getAll } = require("../utils/dbFunctions");
let tableName = "users";

const addUser = async (data) => {
  const result = await insert(tableName, data);
  return result;
};

const getAllUsers = async () => {
  const result = await getAll(tableName);
  return result;
};

module.exports = {
  addUser,
  getAllUsers,
};
