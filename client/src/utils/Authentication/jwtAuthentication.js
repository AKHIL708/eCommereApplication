// jwtUtils.js
import jwt from "jsonwebtoken";

const secretKey = "your_secret_key";

const encodeJWT = (data) => {
  try {
    const token = jwt.sign(data, secretKey);
    return token;
  } catch (error) {
    console.error("JWT encoding failed:", error);
    return null;
  }
};

const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("JWT decoding failed:", error);
    return null;
  }
};

export { encodeJWT, decodeJWT };
