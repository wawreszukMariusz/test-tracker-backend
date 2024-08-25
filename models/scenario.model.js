const mongoose = require("mongoose");

const ScenarioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Scenario name is required"],
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
  },
  {
    timestamps: true,
  }
);

const Scenario = mongoose.model("Scenario", ScenarioSchema);
module.exports = Scenario;
