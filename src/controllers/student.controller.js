const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");
const imagekit = require("../services/storage.service");

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

  const lecturesWithUrls = lectures.map((lecture) => {
    let fileUrl = null;

    if (lecture.fileId) {
      fileUrl = imagekit.url({
        path: lecture.fileId,
        signed: true,
        expireSeconds: 60 * 60,
      });
    }

    return {
      ...lecture.toObject(),
      fileUrl,
    };
  });

  res.json({ lectures: lecturesWithUrls });
}

module.exports = {
  enrollCourse,
  getMyCourses,
  getLectures,
};
