const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemat dla TestCaseResult
const testCaseResultSchema = new Schema({
  passedSteps: [String],
  failedSteps: [String],
});

// Schemat dla TestExecute
const testExecuteSchema = new Schema({
  accessCode: {
    type: String,
    required: true,
  },
  scenarios: {
    type: Map,
    of: {
      type: Map,
      of: testCaseResultSchema,
    },
    required: true,
  },
});

// Eksport modelu
const TestExecute = mongoose.model("TestExecute", testExecuteSchema);
module.exports = TestExecute;
