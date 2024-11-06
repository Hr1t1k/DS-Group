const mongoose = require("mongoose");
const { Schema } = mongoose;

const stateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    distributionLimit: {
      type: Number,
      required: true,
      min: [0, "Percentage should be between 0-100"],
      max: [100, "Percentage should be between 0-100"],
    },
  },
  { timestamps: true }
);

const State = mongoose.model("State", stateSchema);
module.exports = State;
