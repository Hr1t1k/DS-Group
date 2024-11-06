const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getAllState, addState } = require("../controllers/stateController");
const router = express.Router();

router.route("/").post(protect, addState);
router.route("/").get(getAllState);

module.exports = router;
