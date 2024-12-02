const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  loginUser,
  createUser,
  updateUser,
  getUserById,
} = require("../controllers/user.controller.js");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/", createUser);
router.put("/:id", updateUser);

module.exports = router;
