const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  loginUser,
  createUser,
} = require("../controllers/user.controller.js");

router.get("/", getAllUsers);
router.post("/login", loginUser);
router.post("/", createUser);

module.exports = router;
