const mongoose = require("mongoose");
const { Schema } = mongoose;

const giftTrackingSchema = new Schema(
  {
    gift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gift",
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const GiftTracking = mongoose.model("GiftTracking", giftTrackingSchema);
module.exports = GiftTracking;
