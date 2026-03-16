const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Lesson title is required"]
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  videoUrl: {
    type: String,
    required: true
  },

  content: {
    type: String
  },

  order: {
    type: Number,
    required: true
  }

}, {
  timestamps: true
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;