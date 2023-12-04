const router = require("express").Router();
const {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../models/users.model");
const { encrypt } = require("../utils/jwtFunctionality");

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
router.get("/:userId", async (req, res) => {
  const result = await getOneUser([
    {
      column: "id",
      value: req.params.userId,
    },
  ]);
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

router.post("/register", async (req, res) => {
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
router.post("/login", async (req, res) => {
  const result = await getOneUser(req.body);
  console.log("result is : ", result);
  // console.log("result is : ", result);
  if (result == null) {
    return res.status(500).json({
      message: "fail User not found",
    });
  } else {
    let token = encrypt(result);
    if (!result.err) {
      return res.status(200).json({
        message: "success",
        // result,
        token, // this creates a token by taking results data and sends the response
      });
    } else {
      console.log(`${result.err}, ${result.message} `);
      return res.status(500).json(result);
    }
  }
});
router.post("/update", async (req, res) => {
  const { data, id } = req.body;
  const UserExist = await getOneUser([
    {
      column: "id",
      value: id,
    },
  ]);
  const result = await updateUser(data, id);
  if (UserExist) {
    if (!result.err) {
      return res.status(200).json({
        message: "success",
        // result,
        result, // this creates a token by taking results data and sends the response
      });
    } else {
      console.log(`${result.err}, ${result.message} `);
      return res.status(500).json(result);
    }
  } else {
    return res.status(500).json({
      result: result.err,
      message: "failure",
      error: `no user Exist with id : ${id}`,
    });
  }
});

router.post("/delete", async (req, res) => {
  const result = await deleteUser(req.body);
  if (!result.err) {
    res.status(200).json({
      message: "success",
      result,
    });
  } else {
    console.log(`${result.err}, ${result.message} `);
    return res.status(500).json(result);
  }
});

module.exports = router;
