const Lesson = require("../models/lessonModel");
const Course = require("../models/courseModel");


// CREATE LESSON (Instructor only)
exports.createLesson = async (req, res) => {
  try {
    const { title, videoUrl, content, order, course, courseId } = req.body;

    // Accept either courseId or course from frontend
    const courseIdToUse = courseId || course;

    // Verify course exists
    const foundCourse = await Course.findById(courseIdToUse);

    if (!foundCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Only instructor who created the course can add lessons
    if (foundCourse.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Create lesson
    const lesson = await Lesson.create({
      title,
      videoUrl,
      content: content || "",
      order: order || 0,
      course: courseIdToUse
    });

    // Push lesson ID into course.lessons array
    foundCourse.lessons.push(lesson._id);
    await foundCourse.save();

    res.status(201).json(lesson);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// GET LESSONS BY COURSE
exports.getLessonsByCourse = async (req, res) => {
  try {

    const lessons = await Lesson.find({ course: req.params.courseId })
      .sort({ order: 1 });

    res.json(lessons);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE LESSON
exports.updateLesson = async (req, res) => {
  try {

    const lesson = await Lesson.findById(req.params.id).populate("course");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Only instructor who owns the course can update
    if (lesson.course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedLesson);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE LESSON
exports.deleteLesson = async (req, res) => {
  try {

    const lesson = await Lesson.findById(req.params.id).populate("course");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    if (lesson.course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await lesson.deleteOne();

    res.json({ message: "Lesson deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};