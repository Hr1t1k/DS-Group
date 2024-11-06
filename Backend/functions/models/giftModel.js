const mongoose = require("mongoose");
const { Schema } = mongoose;

const giftSchema = new Schema(
  {
    type: { type: String, required: true, trim: true },

    totalQuantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
    },
    remainingQuantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
    },
  },
  { timestamps: true }
);

const Gift = mongoose.model("Gift", giftSchema);
module.exports = Gift;
