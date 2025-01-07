const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testCaseResultSchema = new Schema({
  passedSteps: [String],
  failedSteps: [String],
});

const testExecuteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
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
    default: 0,
  },
  totalFailedTests: {
    type: Number,
    required: false,
    default: 0,
  },
});

const TestExecute = mongoose.model("TestExecute", testExecuteSchema);
module.exports = TestExecute;
