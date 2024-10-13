const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    image: {
      data: Buffer, // Przechowuje dane binarne obrazka
      contentType: String, // Przechowuje typ pliku (np. 'image/jpeg')
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
