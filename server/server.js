const app = require("./app");
var PORT = process.env.PORT || 4000;


// firing server from here .
var server = app.listen(PORT, () => {
  console.log("server listening successfully");
});
