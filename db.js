const mysql = require("mysql2");
const dotenv = require("dotenv");

if (process.env.NODE_ENV == "dev") {
  dotenv.config({ path: ".env.dev" });
} else if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: ".env.production" });
}
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+00:00",
  multipleStatements: true,
  connectTimeout: 2592000,
  wait_timeout: 2592000,
});

connection.connect((err) => {
  if (!err) {
    console.log("DB Connected Successfull.");
  } else {
    console.log(`db Connection failed err :  ${err}`);
  }
});

module.exports = connection;
