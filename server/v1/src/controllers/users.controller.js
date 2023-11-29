const router = require("express").Router();
const { addUser, getAllUsers } = require("../models/users.model");

router.get("/", async (req, res) => {
  const result = await getAllUsers();
  if (result.err) {
    console.log(`${result.err}, ${result.message} `);
    return res.status(500).json(result);
  } else {
    return res.status(200).json({
      message: "success",
      result,
    });
  }
});
router.post("/add", async (req, res) => {
  const { id, name, password, joinedDate, address, state, pincode } = req.body;
  const result = await addUser({
    id,
    name,
    password,
    joinedDate,
    address,
    state,
    pincode,
  });
  // console.log("result is : ", result);
  if (!result.err) {
    return res.status(200).json({
      message: "success",
      result,
    });
  } else {
    console.log(`${result.err}, ${result.message} `);
    return res.status(500).json(result);
  }
});
module.exports = router;
