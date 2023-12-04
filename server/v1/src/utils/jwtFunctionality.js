const jwt = require("jsonwebtoken");
const secretKey = "yourpersonalizedsecretkeyhereyourpersonalizedsecretkeyhere";

const encrypt =  (data) => {
  console.log("acquired data :", data);
  try {
    if (!data) {
      throw new Error("Payload data is required");
    }
    let token =  jwt.sign(data, secretKey);
    return token;
  } catch (err) {
    console.error("ENCRYPTION FAILED : ERROR : ", err);
  }
};

module.exports = {
  encrypt,
};
