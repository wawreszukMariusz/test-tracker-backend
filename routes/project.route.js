const express = require("express");
const multer = require("multer");
const router = express.Router();
const projectController = require("../controllers/project.controller");

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });

// Get all projects
router.get("/", projectController.getAllProjects);

// Get project by accessCode
router.get("/:accessCode", projectController.getProjectByAccessCode);

// Create a new project with image
router.post("/", upload.single("image"), projectController.createProject);
router.put("/:id", upload.single("image"), projectController.updateProject);

module.exports = router;
