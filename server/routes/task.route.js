const express = require("express");
const router = express.Router()

const {getAllTasks, getOneTask, addTask, updateTask, updatedTaskField, deleteTask} = require("../controllers/task.conrtoller")

router.post("/user/:userId/project/:projectId/task", addTask);
router.get("/user/:userId/project/:projectId/tasks", getAllTasks);
router.get("/user/:userId/project/:projectId/task/:taskId", getOneTask)
router.put("/user/:userId/project/:projectId/task/:taskId", updateTask);
router.patch("/user/:userId/project/:projectId/task/:taskId", updatedTaskField);
router.delete("/user/:userId/project/:projectId/task/:taskId", deleteTask)

module.exports = router;