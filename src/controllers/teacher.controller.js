const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");

async function getAssignedCourses(req, res) {
  const teacherId = req.user.id;

  const courses = await Course.find({ teachers: teacherId });
  return res.json({ courses });
}

async function uploadLecture(req, res) {
  const teacherId = req.user.id;
  const { courseId, title, content } = req.body;

  const course = await Course.findOne({ _id: courseId, teachers: teacherId });
  if (!course) {
    return res
      .status(403)
      .json({ message: "You are not assigned to this course" });
  }

  const lecture = await Lecture.create({
    course: courseId,
    title,
    content,
    uploadedBy: teacherId,
  });

  return res.status(201).json({
    message: "Lecture uploaded successfully",
    lecture,
  });
}

async function getCourseLectures(req, res) {
  const teacherId = req.user.id;
  const { courseId } = req.params;

  const course = await Course.findOne({ _id: courseId, teachers: teacherId });
  if (!course) {
    return res
      .status(403)
      .json({ message: "You are not assigned to this course" });
  }

  const lectures = await Lecture.find({ course: courseId });
  return res.json({ lectures });
}

module.exports = { getAssignedCourses, uploadLecture, getCourseLectures };
