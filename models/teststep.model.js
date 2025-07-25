const mongoose = require("mongoose");

const TestStepSchema = mongoose.Schema(
  {
    expected: {
      type: String,
      required: false,
    },
    result: {
      type: String,
      required: false,
    },
    accessCode: {
      type: String,
      required: false,
      default: "undefined",
    },
    testCaseId: {
      type: String,
      required: true,
      required: [true, "TestStep ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

const TestStep = mongoose.model("TestStep", TestStepSchema);
module.exports = TestStep;
