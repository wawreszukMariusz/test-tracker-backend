const Scenario = require("../models/scenario.model.js");

const getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find({});
    res.status(200).json(scenarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScenario = async (req, res) => {
  try {
    const { projectId } = req.params;
    const scenario = await Scenario.find({ projectId });
    res.status(200).json(scenario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateScenario = async (req, res) => {
  try {
    const { id } = req.params;
    const scenario = await Scenario.findByIdAndUpdate(id, req.body);

    if (!scenario) {
      return res.status(404).json({ message: "Scenario not found" });
    }

    const updatedScenario = await Scenario.findById(id);
    res.status(200).json(updatedScenario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteScenario = async (req, res) => {
  try {
    const { id } = req.params;
    const scenario = await Scenario.findByIdAndDelete(id);

    if (!scenario) {
      res.status(404).json({ message: "Scenario not found" });
    }

    res.status(200).json({ message: "Scenario deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addScenario = async (req, res) => {
  try {
    const scenario = await Scenario.create(req.body);
    res.status(200).json(scenario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getScenarios,
  getScenario,
  updateScenario,
  deleteScenario,
  addScenario,
};
