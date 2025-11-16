const express = require("express");
const router = express.Router();

const {getAllProjects, getOneProject, addProject, editProject, updateProjectField, deleteProject} = require("../controllers/project.controller");

router.post("/user/:userId/project", addProject);
router.get("/user/:userId/projects", getAllProjects);
router.get("/user/:userId/project/:projectId", getOneProject)
router.patch("/user/:userId/project/:projectId", updateProjectField);
router.put("/user/:userId/project/:projectId", editProject);
router.delete("/user/:userId/project/:projectId", deleteProject);

module.exports = router;