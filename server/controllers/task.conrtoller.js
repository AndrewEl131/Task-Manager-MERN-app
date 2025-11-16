const User = require("../models/user.model");

const getAllTasks = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    res.status(200).json(project.tasks);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getOneTask = async (req, res) => {
  try {
    const { userId, projectId, taskId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    const task = project.tasks.id(taskId);
    if (!task)
      return res.status(404).json({ errorMessage: "Task Not Found" });

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

const addTask = async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const { title, desc, status, priority } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    const newTask = { title, desc, status, priority, project: projectId };

    project.tasks.push(newTask);

    await user.save();

    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// put

const updateTask = async (req, res) => {
  try {
    const { userId, projectId, taskId } = req.params;
    const { title, desc, status, priority } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    const task = project.tasks.id(taskId);
    if (!task) return res.status(404).json({ errorMessage: "Task Not Found" });

    task.title = title ?? task.title;
    task.desc = desc ?? task.desc;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;

    await user.save();

    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// patch

const updatedTaskField = async (req, res) => {
  try {
    const { userId, projectId, taskId } = req.params;
    const { field, value } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    const task = project.tasks.id(taskId);
    if (!task)
      return res.status(404).json({ errorMessage: "Task Not Found" });

    task[field] = value;

    await user.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { userId, projectId, taskId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

     const task = project.tasks.id(taskId);
    if (!task)
      return res.status(404).json({ errorMessage: "Task Not Found" });

    task.deleteOne();

    await user.save();

    res.status(200).json(user.projects)
  } catch (error) {
    res.status(500).json({ errorMessage: err.message });
  }
}


module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  updatedTaskField,
  deleteTask
};
