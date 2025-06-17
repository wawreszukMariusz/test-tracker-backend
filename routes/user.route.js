const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  loginUser,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/user.controller.js");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
