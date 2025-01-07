const express = require("express");
const router = express.Router();
const testExecuteController = require("../controllers/testexecute.controller");

router.get("/:id", testExecuteController.getTestExecuteById);

router.get(
  "/accessCode/:accessCode",
  testExecuteController.getTestExecuteByAccessCode
);

router.get("/", testExecuteController.getAllTestExecutes);

router.post("/", testExecuteController.saveTestExecute);

module.exports = router;
