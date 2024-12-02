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

// Pobierz wszystkie AccessCodes
router.get("/", getAllAccessCodes);

router.get("/:accessCode", getAccessCodeByCode);

// Zweryfikuj AccessCode i hasło
router.post("/verify", getAccessCodeByCodeAndPassword);

// Utwórz nowy AccessCode lub zwróć istniejący
router.post("/", createOrValidateAccessCode);

// Zaktualizuj AccessCode na podstawie `accessCode`
router.put("/:accessCode", updateAccessCode);

module.exports = router;
