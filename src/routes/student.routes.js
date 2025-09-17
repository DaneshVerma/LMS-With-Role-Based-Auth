const router = require("express").Router();
const {
  enrollCourse,
  getMyCourses,
  getLectures,
} = require("../controllers/student.controller");

const auth = require("../middlewares/auth.middleware");
const acess = require("../middlewares/role.middleware");

router.post("/enroll/:courseId", auth, acess("student"), enrollCourse);
router.get("/enrolled-courses", auth, acess("student"), getMyCourses);
router.get("/lectures/:courseId", auth, acess("student"), getLectures);

module.exports = router;
