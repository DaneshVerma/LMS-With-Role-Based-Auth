const Course = require("../models/course.model");
const User = require("../models/user.model");

// Admin creates course
async function createCourse(req, res) {
  const { name, description } = req.body;

  const newCourse = await Course.create({ name, description });
  res.status(201).json({ message: "Course created", course: newCourse });
}

// Assign teacher to course
async function assignTeacher(req, res) {
  const { courseId, teacherId } = req.body;

  const teacher = await User.findById(teacherId);
  if (!teacher || teacher.role !== "teacher") {
    return res.status(400).json({ message: "Invalid teacher ID" });
  }

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  course.teachers.push(teacherId);
  await course.save();

  res.json({ message: "Teacher assigned successfully", course });
}

module.exports = { createCourse, assignTeacher };
