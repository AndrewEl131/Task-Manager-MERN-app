const User = require("../models/user.model");

const getAllProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getOneProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const addProject = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, desc, color } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const newProject = { title: title, desc: desc, color: color };

    user.projects.push(newProject);

    await user.save();
    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// put

const editProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const { title, desc, color } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    if (title !== undefined) project.title = title;
    if (desc !== undefined) project.desc = desc;
    if (color !== undefined) project.color = color;

    await user.save();

    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// patch

const updateProjectField = async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const { field, value } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    if (project[field] === undefined) {
      return res.status(400).json({ errorMessage: "Invalid field name" });
    }

    project[field] = value;

    await user.save();

    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const project = user.projects.id(projectId);
    if (!project)
      return res.status(404).json({ errorMessage: "Project Not Found" });

    project.deleteOne();

    await user.save();

    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  getAllProjects,
  getOneProject,
  addProject,
  editProject,
  deleteProject,
  updateProjectField,
};
