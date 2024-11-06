const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getStateByID,
  getAllState,
  addState,
} = require("../controllers/stateController");
const router = express.Router();

router.route("/").post(protect, addState);
router.route("/").get(getAllState);
router.route("/:id").get(protect, getStateByID);
module.exports = router;
