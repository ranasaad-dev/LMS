const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", protect, userController.updateUser);

router.delete("/:id", protect, userController.deleteUser);

module.exports = router;
