const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password, rePassword } = req.body;

    if (!username || !password || !rePassword)
      return res.status(400).json({ errorMessage: "Please Enter Fields" });

    const existingUser = await User.findOne({ username: username });
    if (existingUser)
      return res.status(400).json({ errorMessage: "Username already exists" });

    if (password !== rePassword)
      return res.status(400).json({ errorMessage: "Passwords don't match" });

    // Password rules
    if (password.length < 8) {
      return res
        .status(400)
        .json({ errorMessage: "Password must be at least 8 characters long" });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        errorMessage: "Password must contain at least one lowercase letter",
      });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        errorMessage: "Password must contain at least one uppercase letter",
      });
    }
    if (!/[0-9]/.test(password)) {
      return res
        .status(400)
        .json({ errorMessage: "Password must contain at least one number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const correctUsername = username.trim();

    const newUser = await User.create({
      username: correctUsername,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password, id } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ errorMessage: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(400).json({ errorMessage: "Password is incorrect" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const updateUserField = async (req, res) => {
  try {
    const { userId } = req.params;
    const { field, value } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    if (user[field] === undefined) {
      return res.status(400).json({ errorMessage: "Invalid field name" });
    }

    user[field] = value;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ errorMessage: "User Not Found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ errorMessage: "Old password is incorrect" });

    // Password rules
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ errorMessage: "Password must be at least 8 characters long" });
    }
    if (!/[a-z]/.test(newPassword)) {
      return res.status(400).json({
        errorMessage: "Password must contain at least one lowercase letter",
      });
    }
    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({
        errorMessage: "Password must contain at least one uppercase letter",
      });
    }
    if (!/[0-9]/.test(newPassword)) {
      return res
        .status(400)
        .json({ errorMessage: "Password must contain at least one number" });
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({
        errorMessage: "New password cannot be the same as old password",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  updateUserField
};
