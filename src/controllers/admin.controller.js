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

module.exports = {
  createUserByAdmin,
};