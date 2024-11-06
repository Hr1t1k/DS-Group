const asyncHandler = require("express-async-handler");
const Gift = require("../models/giftModel.js");
var mongoose = require("mongoose");

const addNewGift = asyncHandler(async (req, res) => {
  const { type, quantity } = req.body;
  try {
    // Check if the data is valid or not
    if (!type || quantity < 0) {
      res.status(400);
      throw new Error("Please provide valid data");
    }

    const gift = await State.create({
      type,
      totalQuantity: quantity,
      remainingQuantity: quantity,
    });
    res.status(200).json("New Gift Type added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const restockGifts = asyncHandler(async (req, res) => {
  const gifts = req.body;
  console.log(gifts);
  try {
    const restock = gifts.map((gift) => ({
      updateOne: {
        filter: { _id: gift.giftId },
        update: {
          $inc: {
            totalQuantity: gift.quantity,
            remainingQuantity: gift.quantity,
          },
        },
      },
    }));
    await Gift.bulkWrite(restock);
    res.status(200).send("Restocking done successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const allGifts = asyncHandler(async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.status(200).json(gifts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const availableGifts = async () => {
  const gifts = await Gift.find({ remainingQuantity: { $gt: 0 } });
  return gifts;
};

const useGift = async (id) => {
  const gift = await Gift.findByIdAndUpdate(
    id,
    { $inc: { remainingQuantity: -1 } },
    { new: true }
  );
  console.log(gift);
};
module.exports = {
  addNewGift,
  restockGifts,
  allGifts,
  availableGifts,
  useGift,
};
