const TestStep = require("../models/teststep.model.js");

const getTestSteps = async (req, res) => {
  try {
    const testSteps = await TestStep.find({});
    res.status(200).json(testSteps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTestStepsByTestCaseId = async (req, res) => {
  try {
    const { testCaseId } = req.params;
    const testStep = await TestStep.find({ testCaseId });
    res.status(200).json(testStep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTestStep = async (req, res) => {
  try {
    const { id } = req.params;
    const testStep = await TestStep.findByIdAndUpdate(id, req.body);

    if (!testStep) {
      return res.status(404).json({ message: "TestStep not found" });
    }

    const updateTestStep = await TestStep.findById(id);
    res.status(200).json(updateTestStep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTestStep = async (req, res) => {
  try {
    const { id } = req.params;
    const testStep = await TestStep.findByIdAndDelete(id);

    if (!testStep) {
      res.status(404).json({ message: "TestStep not found" });
    }

    res.status(200).json({ message: "TestStep deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTestStep = async (req, res) => {
  try {
    const testStep = await TestStep.create(req.body);
    res.status(200).json(TestStep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMultipleTestSteps = async (req, res) => {
  try {
    const testSteps = req.body;

    if (!Array.isArray(testSteps)) {
      return res
        .status(400)
        .json({ message: "Data must be an array of test steps" });
    }

    const createdTestSteps = await TestStep.insertMany(testSteps);
    res.status(201).json(createdTestSteps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTestSteps,
  getTestStepsByTestCaseId,
  updateTestStep,
  deleteTestStep,
  addTestStep,
  addMultipleTestSteps,
};
