const mongoose = require("mongoose");
const Course = require("../models/course.model");

async function createUserByAdmin(req, res) {
  const {
    role,
    userName,
    password,
    fullName: { firstName, lastName },
    email,
  } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const newUser = await userModel.create({
    userName,
    password,
    fullName: { firstName, lastName },
    email,
    role,
  });
  return res.status(201).json({
    message: `${role} created successfully`,
    user: {
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
      fullName: newUser.fullName,
    },
  });
}

async function getAdminDashboard(req, res) {
  try {
    const result = await Course.aggregate([
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
          totalStudents: { $size: "$students" },
          totalTeachers: { $size: "$teachers" },
          totalLectures: { $size: "$lectures" },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          totalStudents: 1,
          totalTeachers: 1,
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
module.exports = {
  createUserByAdmin,
  getAdminDashboard
};