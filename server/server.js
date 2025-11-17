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
    "https://nimble-youtiao-ee33c2.netlify.app"  // შენი Netlify domain
  ],
  credentials: true
}));

app.get("/ping", (req, res) => {
  res.status(200).json({ status: "awake" });
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
