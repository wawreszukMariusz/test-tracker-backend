const Project = require("../models/project.model");
const Scenario = require("../models/scenario.model");
const TestCase = require("../models/testcase.model");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectByAccessCode = async (req, res) => {
  const { accessCode } = req.params;

  try {
    const projects = await Project.find({ accessCode });
    if (projects.length === 0) {
      return res.status(404).json({ message: "Projects not found" });
    }

    const projectsWithImages = projects.map((project) => {
      const image = project.image
        ? `data:${
            project.image.contentType
          };base64,${project.image.data.toString("base64")}`
        : null;

      return {
        id: project._id,
        name: project.name,
        accessCode: project.accessCode,
        imageUrl: image,
      };
    });

    res.status(200).json(projectsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  console.log(req.file); // Sprawdź, co jest w req.file

  const { name, accessCode } = req.body;
  const image = req.file; // Multer places the file object on req.file

  if (!image) {
    return res.status(400).json({ message: "Image file is required" });
  }

  try {
    const newProject = new Project({
      name,
      accessCode,
      image: {
        data: image.buffer, // Buffer for binary data
        contentType: image.mimetype, // Type of the image (e.g., 'image/jpeg')
      },
    });

    const savedProject = await newProject.save();
    res.status(201).json({ id: savedProject._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, accessCode } = req.body;
  const image = req.file; // If a new image is uploaded

  try {
    // Find the project by ID
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update the fields if they exist in the request
    if (name) project.name = name;
    if (accessCode) project.accessCode = accessCode;

    // If a new image is provided, update the image field
    if (image) {
      project.image = {
        data: image.buffer,
        contentType: image.mimetype,
      };
    }

    // Save the updated project
    const updatedProject = await project.save();
    res.status(200).json({
      id: updatedProject._id,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTestCasesCountByAutomation = async (req, res) => {
  const { accessCode } = req.params;

  try {
    // Krok 1: Dopasowanie projektu na podstawie accessCode
    const projects = await Project.aggregate([
      {
        $match: { accessCode: accessCode },
      },
    ]);

    console.log("Projects after accessCode match:", projects);

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found with that access code" });
    }

    // Krok 2: Połączenie z kolekcją `scenarios` z konwersją na ObjectId
    const results = await Project.aggregate([
      {
        $match: { accessCode: accessCode },
      },
      {
        $lookup: {
          from: "scenarios",
          let: { projectId: { $toString: "$_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$projectId", "$$projectId"] },
              },
            },
          ],
          as: "scenarios",
        },
      },
      {
        $unwind: "$scenarios",
      },
      {
        $lookup: {
          from: "testcases",
          let: { scenarioIdStr: { $toString: "$scenarios._id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$scenarioId", "$$scenarioIdStr"] },
              },
            },
          ],
          as: "testcases",
        },
      },
      {
        $unwind: "$testcases",
      },
      {
        $group: {
          _id: "$_id",
          projectName: { $first: "$name" },
          automatedCount: {
            $sum: { $cond: [{ $eq: ["$testcases.isAutomated", true] }, 1, 0] },
          },
          notAutomatedCount: {
            $sum: { $cond: [{ $eq: ["$testcases.isAutomated", false] }, 1, 0] },
          },
        },
      },
    ]);

    console.log("Final aggregation results:", results);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
