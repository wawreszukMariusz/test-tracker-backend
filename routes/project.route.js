const express = require("express");
const multer = require("multer");
const router = express.Router();
const projectController = require("../controllers/project.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", projectController.getAllProjects);
router.get("/:accessCode", projectController.getProjectByAccessCode);
router.post("/", upload.single("image"), projectController.createProject);
router.put("/:id", upload.single("image"), projectController.updateProject);
router.get(
  "/testAutomationCount/:accessCode",
  projectController.getTestCasesCountByAutomation
);

module.exports = router;
