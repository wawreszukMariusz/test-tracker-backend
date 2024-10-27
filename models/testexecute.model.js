const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemat dla TestCaseResult
const testCaseResultSchema = new Schema({
  passedSteps: [String],
  failedSteps: [String],
});

// Schemat dla TestExecute
const testExecuteSchema = new Schema({
  name: {
    type: String,
    required: true, // Zakładam, że nazwa jest wymagana
  },
  projectName: {
    type: String,
    required: true, // Zakładam, że nazwa jest wymagana
  },
  executionTime: {
    type: String,
    required: false,
  },
  accessCode: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
  scenarios: {
    type: Map,
    of: {
      type: Map,
      of: testCaseResultSchema,
    },
    required: true,
  },
  totalPassedTests: {
    type: Number,
    required: false,
    default: 0, // Domyślna wartość to 0
  },
  totalFailedTests: {
    type: Number,
    required: false,
    default: 0, // Domyślna wartość to 0
  },
});

// Eksport modelu
const TestExecute = mongoose.model("TestExecute", testExecuteSchema);
module.exports = TestExecute;
