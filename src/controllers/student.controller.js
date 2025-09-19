const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");
const imagekit = require("../services/storage.service");
const mongoose = require('mongoose');
async function getDashboard(req, res) {
  const studentId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const result = await Course.aggregate([
      { $match: { students: studentId } },
      {
        $lookup: {
          from: "users",
          localField: "teachers",
          foreignField: "_id",
          as: "teacherDetails",
        },
      },
      {
        $lookup: {
          from: "lectures",
          localField: "_id",
          foreignField: "course",
          as: "lectures",
        },
      },
      {
        $addFields: {
          totalLectures: { $size: "$lectures" },
          teachers: {
            $map: {
              input: "$teacherDetails",
              as: "teacher",
              in: {
                id: "$$teacher._id",
                fullName: "$$teacher.fullName",
                email: "$$teacher.email",
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          teachers: 1,
          totalLectures: 1,
        },
      },
    ]);

    return res.json({ dashboard: result });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Aggregation failed", error: err.message });
  }
}

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

    if (lecture.filePath) {
      fileUrl = imagekit.url({
        path: lecture.filePath,
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
  getDashboard,
};
