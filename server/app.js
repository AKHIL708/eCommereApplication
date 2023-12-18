const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userController = require("./v1/src/controllers/users.controller");
const productController = require("./v1/src/controllers/products.controller");
const ordersController = require("./v1/src/controllers/orders.controller");
const cartItemsController = require("./v1/src/controllers/cart.controller");
const imageController = require("./v1/src/controllers/images.controller");

if (process.env.NODE_ENV == "dev") {
  dotenv.config({ path: ".env.dev" });
} else if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: ".env.production" });
}
// parser application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use(express.json());

app.use("/v1/users", userController);
app.use("/v1/products", productController);
app.use("/v1/orders", ordersController);
app.use("/v1/cartItems", cartItemsController);
app.use("/v1/uploads", imageController);

__dirname = path.resolve();

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is running .. 🚀");
  });
}

//error handling
app.use((err, req, res, next) => {
  // log.error(err.message);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
