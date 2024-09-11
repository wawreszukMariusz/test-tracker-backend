// routes/testExecute.route.js
const express = require("express");
const router = express.Router();
const testExecuteController = require("../controllers/testexecute.controller");

// Pobierz TestExecute na podstawie ID
router.get("/:id", testExecuteController.getTestExecuteById);

// Pobierz wszystkie TestExecute po accessCode
router.get(
  "/accessCode/:accessCode",
  testExecuteController.getTestExecuteByAccessCode
);

// Pobierz wszystkie TestExecute
router.get("/", testExecuteController.getAllTestExecutes);

// Zapisz nowy TestExecute
router.post("/", testExecuteController.saveTestExecute);

module.exports = router;
