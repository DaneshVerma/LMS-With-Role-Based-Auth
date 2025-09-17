const router = require("express").Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/auth.controller");
const {
  registerUserValidation,
  loginValidation,
} = require("../middlewares/validation.middleware");

router.post("/signup/:key", registerUserValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", logoutUser)
module.exports = router;
