const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");


// PUBLIC ROUTES

// Get all courses
router.get("/", courseController.getCourses);

// Get single course
router.get("/:id", courseController.getCourseById);


// PROTECTED ROUTES (Instructor only)

// Create course
router.post("/", protect, courseController.createCourse);

// Update course
router.put("/:id", protect, courseController.updateCourse);

// Delete course
router.delete("/:id", protect, courseController.deleteCourse);


module.exports = router;