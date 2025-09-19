const router = require("express").Router();
const {
  createUserByAdmin,
  getAdminDashboard,
} = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");
const acess = require("../middlewares/role.middleware");

router.post("/create-user", auth, acess("admin"), createUserByAdmin);
router.get("/dashboard", auth, acess("admin"), getAdminDashboard);

module.exports = router;
