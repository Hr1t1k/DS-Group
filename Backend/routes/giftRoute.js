const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addNewGift,
  allGifts,
  restockGifts,
} = require("../controllers/giftController");
const router = express.Router();

router.route("/").post(protect, addNewGift);
router.route("/").get(protect, allGifts);
router.route("/").put(protect, restockGifts);

module.exports = router;
