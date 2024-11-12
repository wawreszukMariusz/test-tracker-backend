const mongoose = require("mongoose");

const TestCaseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "TestCase name is required"],
    },
    createDate: {
      type: String,
      required: false,
      default: "10/10/2024",
    },
    accessCode: {
      type: String,
      required: false,
      default: "undefined",
    },
    scenarioId: {
      type: String,
      required: true,
    },
    isAutomated: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TestCase = mongoose.model("TestCase", TestCaseSchema);
module.exports = TestCase;
