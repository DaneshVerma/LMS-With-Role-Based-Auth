const router = require("express").Router();
const {
  getAssignedCourses,
  uploadLecture,
  getCourseLectures,
} = require("../controllers/teacher.controller");

const auth = require("../middlewares/auth.middleware");
const acess = require("../middlewares/role.middleware");
const upload = require("../config/multer.config");

router.get("/courses", auth, acess("teacher"), getAssignedCourses);
router.post("/upload-lecture", auth, acess("teacher"), upload.single("file"), uploadLecture);
router.get("/lectures/:courseId", auth, acess("teacher"), getCourseLectures);

module.exports = router;
