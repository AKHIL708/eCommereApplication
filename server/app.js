const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
require("../db");

if (process.env.NODE_ENV == "dev") {
  dotenv.config({ path: ".env.dev" });
} else if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: ".env.production" });
}

__dirname = path.resolve();

if (process.env.NODE_ENV == "production") {
  app.use(
    express.static(path.join(__dirname, "/client/dist"))
  );
  app.get("*" , (req,res) => {
    res.sendFile(path.resolve(__dirname , "client" , "dist" , "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("Server is running .. 🚀");
  });
}

module.exports = app;
