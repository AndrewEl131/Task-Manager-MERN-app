const express = require("express");
const router = express.Router();
const {
  register,
  login,
  changePassword,
  updateUserField,
} = require("../controllers/user.controller");

// User routes
router.post("/register", register);
router.post("/login", login);
router.patch("/user/:userId", updateUserField);
router.post("/user/:userId/change-password", changePassword); 

module.exports = router;
