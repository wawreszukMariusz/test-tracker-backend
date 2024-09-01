const express = require("express");
const router = express.Router();
const {
  getTestSteps,
  getTestStepsByTestCaseId,
  updateTestStep,
  deleteTestStep,
  addTestStep,
} = require("../controllers/teststep.controller.js");

router.get("/", getTestSteps);
router.get("/:testCaseId", getTestStepsByTestCaseId);
router.put("/:id", updateTestStep);
router.delete("/:id", deleteTestStep);
router.post("/", addTestStep);

module.exports = router;
