const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  content: String, // Could be text, URLs, etc.
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("lecture", lectureSchema);
