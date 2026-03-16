const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  comment: {
    type: String
  }

}, {
  timestamps: true
});

// Prevent multiple reviews by same student on same course
reviewSchema.index({ student: 1, course: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;