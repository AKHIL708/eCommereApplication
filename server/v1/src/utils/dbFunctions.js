const db = require("../../../../db");

const getAll = async (tableName) => {
  var sql = `SELECT * FROM ${tableName};`;
  try {
    let [result] = await db.promise().query(sql);
    return result;
  } catch (err) {
    const errorResult = {
      message: "Error in SQL",
      err: err.message,
      code: err.code,
    };
    return errorResult;
  }
};
const insert = async (tableName, dataObj) => {
  var sql = `INSERT INTO ${tableName} (`;
  var values = [];
  Object.keys(dataObj).forEach((key) => {
    sql += `${key} ,`;
    values.push(dataObj[key]);
  });
  sql = sql.slice(0, sql.length - 1); // removing the last coma ,;
  sql += " ) VALUES (?)";
  try {
    var result = await db
      .promise()
      .query(sql, [values])
      .catch((err) => {
        return {
          message: "Error ini SQL",
          err: err.message,
          code: err.code,
        };
      });
    if (Array.isArray(result)) {
      return result[0];
    }
    if (result.err) {
      return result;
    }
  } catch (err) {
    const errorResult = {
      message: "Error in SQL",
      err: err.message,
      code: err.code,
    };
    return errorResult;
  }
};

module.exports = {
  insert,
  getAll,
};
