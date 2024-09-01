const express = require("express");
const router = express.Router();
const TestCase = require("../models/testcase.model.js");
const {
  getTestCases,
  getTestCasesByScenarioId,
  updateTestCase,
  deleteTestCase,
  addTestCase,
} = require("../controllers/testcase.controller.js");

router.get("/", getTestCases);
router.get("/:scenarioId", getTestCasesByScenarioId);
router.put("/:id", updateTestCase);
router.delete("/:id", deleteTestCase);
router.post("/", addTestCase);

module.exports = router;
