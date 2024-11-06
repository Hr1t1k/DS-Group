const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  distributeGift,
  getGiftsByUID,
  getAllGifts,
} = require("../controllers/giftTrackingController");
const router = express.Router();

router.route("/").post(protect, distributeGift);
router.route("/").get(protect, getGiftsByUID);
router.route("/all").get(protect, getAllGifts);

module.exports = router;
