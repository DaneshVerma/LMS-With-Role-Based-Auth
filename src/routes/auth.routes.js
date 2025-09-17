const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const {
  registerUserValidation,
  loginValidation,
} = require("../middlewares/validation.middleware");

router.post("/signup/:key", registerUserValidation, registerUser);
router.post("/login", loginValidation, loginUser);

module.exports = router;
