const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    image: {
      data: Buffer,
      contentType: String,
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

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
