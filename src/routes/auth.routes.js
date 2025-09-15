const router = require("express").Router();
const registerUser = require("../controllers/auth.controller");
const {
  registerUserValidation,
} = require("../middlewares/validation.middleware");

router.post("/signup/:key", registerUserValidation, registerUser);

module.exports = router;
