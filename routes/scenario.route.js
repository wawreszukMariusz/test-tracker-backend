const express = require("express");
const router = express.Router();
const Scenario = require("../models/scenario.model.js");
const {
  getScenarios,
  getScenario,
  updateScenario,
  deleteScenario,
  addScenario,
  allFromScenarios,
} = require("../controllers/scenario.controller.js");

router.get("/", getScenarios);
router.get("/:projectId", getScenario);
router.put("/:id", updateScenario);
router.delete("/:id", deleteScenario);
router.post("/", addScenario);

module.exports = router;
