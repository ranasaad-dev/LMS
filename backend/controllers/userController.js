// controllers/userController.js
const User = require("../models/userModel");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by MongoDB _id
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    const savedUser = await newUser.save(); 
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// PUT update user
exports.updateUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    // Build update object dynamically
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (role !== undefined) updateFields.role = role;

    // Attempt to update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    // If no user found, return 404
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    // Handle invalid ObjectId or other errors
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    res.status(400).json({ message: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};