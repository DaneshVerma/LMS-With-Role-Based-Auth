const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  teachers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
  students: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
});

module.exports = mongoose.model("course", courseSchema);
