const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "To Do",
  },
  priority: {
    type: String,
    default: "Normal",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
    default: "No description"
  },
  tasks: {
    type: [TaskSchema],
    default: [],
  },
  color: {
    type: String,
    default: "#fff"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  projects: {
    type: [ProjectSchema],
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
