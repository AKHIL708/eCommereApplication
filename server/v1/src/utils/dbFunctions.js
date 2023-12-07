const db = require("../../../../db");
const { encrypt } = require("../utils/jwtFunctionality");

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

const getDataBasedOnCondition = async (tableName, conditions) => {
  try {
    // Construct the WHERE clause based on the conditions
    const whereClause = conditions
      .map((condition) => `${condition.column} = ?`)
      .join(" AND ");

    // Construct the SQL query
    const sql = `SELECT * FROM ${tableName} WHERE ${whereClause};`;

    // Extract values from conditions for SQL parameters
    const values = conditions.map((condition) => condition.value);

    // Execute the SQL query using the database connection
    let [result] = await db.promise().query(sql, values);

    // Return the result (an array of rows) to the caller
    return result.length > 0 ? result : null; // Return the first result or null if no result
  } catch (err) {
    // If an error occurs during the query execution, catch the error and return an error object
    throw err;
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


const insertMany = async (tableName, dataArray) => {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return {
      message: "Invalid input data",
      err: "Input data must be a non-empty array of objects",
      code: "INVALID_INPUT",
    };
  }

  try {
    const results = [];
    for (const dataObj of dataArray) {
      const keys = Object.keys(dataObj);
      const values = Object.values(dataObj);

      const placeholders = keys.map(() => "?").join(", ");
      const sql = `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${placeholders})`;

      const result = await db
        .promise()
        .query(sql, values)
        .catch((err) => {
          return {
            message: "Error in SQL",
            err: err.message,
            code: err.code,
          };
        });

      results.push(result);
    }

    return results;
  } catch (err) {
    const errorResult = {
      message: "Error in SQL",
      err: err.message,
      code: err.code,
    };
    return errorResult;
  }
};


const update = async (tableName, newData, id) => {
  try {
    var updateData = newData.map((data) => `${data.column} = ?`).join(",");
    var sql = `UPDATE ${tableName} SET ${updateData} WHERE id = '${id}'; `;
    let values = newData.map((data) => data.value);
    let [result] = await db.promise().query(sql, values);
    return result;
  } catch (err) {
    const errorResult = {
      message: "Error in SQL",
      err: err.message,
      code: err.code,
      query: sql,
    };
    return errorResult;
  }
};

const DeleteRow = async (tableName, conditions) => {
  try {
    let whereClause = conditions
      .map((data) => `${data.column} = ?`)
      .join("AND");
    let values = conditions.map((data) => data.value);
    var sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
    let [result] = await db.promise().query(sql, values);
    return result;
  } catch (err) {
    const errorResult = {
      message: "Error in SQL",
      err: err.message,
      code: err.code,
      query: sql,
    };
    return errorResult;
  }
};

module.exports = {
  insert,
  insertMany,
  getAll,
  update,
  getDataBasedOnCondition,
  DeleteRow,
};
