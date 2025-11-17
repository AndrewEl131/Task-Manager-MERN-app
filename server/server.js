require("dotenv").config();
const cors = require("cors")
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

const User = require("./models/user.model");

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nimble-youtiao-ee33c2.netlify.app" 
  ],
  credentials: true
}));

app.get("/keepalive", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).send('{"ok": true}');
});



const userRoute = require("./routes/user.route")
const projectRoute = require("./routes/project.route")
const taskRoute = require("./routes/task.route")
app.use("/api", userRoute)
app.use("/api", projectRoute)
app.use("/api", taskRoute)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });
