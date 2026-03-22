const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


// REGISTER
exports.register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// LOGIN
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
// PROFILE
exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);
    user.password = undefined;
    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.updateUser = async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;
  
  // req.user comes from JWT middleware
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }
  
  if (!currentPassword) {
    return res.status(400).json({
      message: "Current password required"
    });
  }
  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      message: "Current password is incorrect"
    });
  }


  try {

    if (name) {
      user.name = name;
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};