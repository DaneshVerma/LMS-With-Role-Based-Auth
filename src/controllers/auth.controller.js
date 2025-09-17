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

  const existingUser = await userModel.findOne({ userName });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (key === process.env.KEY) {
    const newUser = await userModel.create({
      userName,
      password,
      fullName: { firstName, lastName },
      email,
      role: "admin",
    });

    const token = newUser.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "admin registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
        fullName: newUser.fullName,
      },
      token,
    });
  } else {
    return res.status(400).json({ message: "Invalid key" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = user.generateToken();
  res.cookie("token", token, { httpOnly: true });

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    },
    token,
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout successful",
  });
}

module.exports = { registerUser, loginUser, logoutUser };
