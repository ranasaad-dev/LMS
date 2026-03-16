const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const { protect } = require("../middleware/authMiddleware");


// CREATE LESSON (Instructor)
router.post("/", protect, lessonController.createLesson);


// GET LESSONS BY COURSE
router.get("/course/:courseId", lessonController.getLessonsByCourse);


// UPDATE LESSON
router.put("/:id", protect, lessonController.updateLesson);


// DELETE LESSON
router.delete("/:id", protect, lessonController.deleteLesson);


module.exports = router;