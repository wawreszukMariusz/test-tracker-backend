// controllers/testExecute.controller.js
const TestExecute = require("../models/testexecute.model.js");

// Pobierz TestExecute na podstawie ID
exports.getTestExecuteById = async (req, res) => {
  try {
    const testExecute = await TestExecute.findById(req.params.id);
    if (!testExecute) {
      return res.status(404).json({ message: "TestExecute not found" });
    }
    res.json(testExecute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Pobierz wszystkie TestExecute po accessCode
exports.getTestExecuteByAccessCode = async (req, res) => {
  try {
    const testExecutes = await TestExecute.find({
      accessCode: req.params.accessCode,
    });
    if (testExecutes.length === 0) {
      return res
        .status(404)
        .json({ message: "No TestExecute found with this accessCode" });
    }
    res.json(testExecutes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Pobierz wszystkie TestExecute
exports.getAllTestExecutes = async (req, res) => {
  try {
    const testExecutes = await TestExecute.find();
    if (testExecutes.length === 0) {
      return res.status(404).json({ message: "No TestExecute found" });
    }
    res.json(testExecutes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Zapisz nowy TestExecute
exports.saveTestExecute = async (req, res) => {
  try {
    const { accessCode, scenarios } = req.body;

    const testExecute = new TestExecute({
      accessCode,
      scenarios,
    });

    await testExecute.save();
    res.status(201).json({ message: "Test results saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
