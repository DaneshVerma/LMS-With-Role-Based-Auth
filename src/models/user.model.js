const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    required: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
