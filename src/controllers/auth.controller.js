const userModel = require("../models/user.model");

async function registerUser(req, res) {
  const { key } = req.params;
  if (!key) return res.status(400).json({ message: "Key is required" });
  const {
    userName,
    password,
    fullName: { firstName, lastName },
    email,
  } = req.body;
  if (!userName || !password || !firstName || !lastName || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (key === process.env.KEY) {
    const newUser = await userModel.create({
      userName,
      password,
      fullName: { firstName, lastName },
      email,
      role: "admin",
    });
    return res
      .status(201)
      .json({ message: "admin registered successfully", user: newUser });
  } else {
    return res.status(400).json({ message: "Invalid key" });
  }
}

module.exports = registerUser;
