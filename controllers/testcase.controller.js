const TestCase = require("../models/testcase.model.js");

const getTestCases = async (req, res) => {
  try {
    const testCases = await TestCase.find({});
    res.status(200).json(testCases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTestCasesByScenarioId = async (req, res) => {
  try {
    const { scenarioId } = req.params;
    const testCase = await TestCase.find({ scenarioId });
    res.status(200).json(testCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const testCase = await TestCase.findByIdAndUpdate(id, req.body);

    if (!testCase) {
      return res.status(404).json({ message: "TestCase not found" });
    }

    const updatedTestCase = await TestCase.findById(id);
    res.status(200).json(updatedTestCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const testCase = await TestCase.findByIdAndDelete(id);

    if (!testCase) {
      res.status(404).json({ message: "TestCase not found" });
    }

    res.status(200).json({ message: "TestCase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTestCase = async (req, res) => {
  try {
    const testCase = await TestCase.create(req.body);
    res.status(200).json(testCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTestCases,
  getTestCasesByScenarioId,
  updateTestCase,
  deleteTestCase,
  addTestCase,
};
