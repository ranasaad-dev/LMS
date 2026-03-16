const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");


// ADD REVIEW TO COURSE
router.post("/:courseId", protect, reviewController.addReview);


// GET REVIEWS FOR A COURSE
router.get("/course/:courseId", reviewController.getCourseReviews);


// UPDATE REVIEW
router.put("/:id", protect, reviewController.updateReview);


// DELETE REVIEW
router.delete("/:id", protect, reviewController.deleteReview);


module.exports = router;