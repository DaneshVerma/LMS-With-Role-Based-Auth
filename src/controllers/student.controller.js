const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");


async function enrollCourse(req, res) {
  const studentId = req.user.id;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (course.students.includes(studentId)) {
    return res.status(400).json({ message: "Already enrolled" });
  }

  course.students.push(studentId);
  await course.save();

  return res.json({ message: "Enrolled successfully", course });
}

async function getMyCourses(req, res) {
  const studentId = req.user.id;
  const courses = await Course.find({ students: studentId });
  res.json({ courses });
}

async function getLectures(req, res) {
  const studentId = req.user.id;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (!course.students.includes(studentId)) {
    return res
      .status(403)
      .json({ message: "You are not enrolled in this course" });
  }

  const lectures = await Lecture.find({ course: courseId });
  res.json({ lectures });
}

module.exports = {
  enrollCourse,
  getMyCourses,
  getLectures,
};
