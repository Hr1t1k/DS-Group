const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const { addUser, addAdminPrivilage } = require("../controllers/userController");
router.route("/").post(addUser);
router.route("/").put(protect, addAdminPrivilage);
module.exports = router;
