const router = require("express").Router();
const {
  createCourse,
  assignTeacher,
} = require("../controllers/course.controller");
const auth = require("../middlewares/auth.middleware");
const acess = require("../middlewares/role.middleware");

router.post("/", auth, acess("admin"), createCourse);
router.post("/assign-teacher", auth, acess("admin"), assignTeacher);

module.exports = router;
