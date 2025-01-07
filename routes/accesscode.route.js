const express = require("express");
const {
  getAllAccessCodes,
  getAccessCodeByCodeAndPassword,
  getAccessCodeByCode,
  createAccessCode,
  updateAccessCode,
  createOrValidateAccessCode,
} = require("../controllers/accesscode.controller.js");

const router = express.Router();

router.get("/", getAllAccessCodes);

router.get("/:accessCode", getAccessCodeByCode);

router.post("/verify", getAccessCodeByCodeAndPassword);

router.post("/", createOrValidateAccessCode);

router.put("/:accessCode", updateAccessCode);

module.exports = router;
