const asyncHandler = require("express-async-handler");
const GiftTracking = require("../models/giftTrackingModel.js");
const User = require("../models/userModel.js");
const { useGift, availableGifts } = require("./giftController.js");

const short = require("short-uuid");

const distributeGift = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  try {
    //if user is invalid
    if (!uid) {
      res.status(400);
      throw new Error(
        "User not authorised please try again with different account"
      );
    }
    const user = await User.findOne({ uid: uid }).populate({ path: "state" });
    const gifts = await availableGifts();
    const length = gifts.length;
    if (length < 1) {
      res.status(200).json({ message: "Bad Luck, Try again later." });
      return;
    }
    const randomNum = Math.floor(Math.random() * length);
    console.log(randomNum, length);
    const currGift = gifts[randomNum];

    const state = user.state._id;
    const distributionLimit = user.state.distributionLimit;
    const usedGiftsCnt = await GiftTracking.find({ state }).countDocuments();
    const giftAlreadyTaken = await GiftTracking.findOne({
      recipient: user._id,
      gift: currGift._id,
    })
      .select("_id")
      .lean();

    const giftLimit = (distributionLimit / 100) * currGift.totalQuantity;

    if (
      giftAlreadyTaken != null ||
      currGift.remainingQuantity < 1 ||
      usedGiftsCnt >= giftLimit
    ) {
      res.status(200).json({ message: "Bad Luck, Try again later." });
      return;
    }
    const newOrder = await GiftTracking.create({
      gift: currGift._id,
      state,
      trackingNumber: short.generate(),
      recipient: user._id,
    });
    await newOrder.populate({ path: "gift" });
    console.log(newOrder);
    useGift(currGift._id);
    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
const getGiftsByUID = asyncHandler(async (req, res) => {
  try {
    const uid = req.user.uid;
    // Check if the user data is valid or not
    if (!uid) {
      res.status(400);
      throw new Error("Please provide valid uid");
    }
    const user = await User.findOne({ uid });

    const gifts = await GiftTracking.find({ recipient: user._id }).populate({
      path: "gift",
    });

    res.status(200).json(gifts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
const getAllGifts = asyncHandler(async (req, res) => {
  try {
    const gifts = await GiftTracking.find().populate([
      {
        path: "gift",
        select: " type",
      },
      {
        path: "recipient",
        select: "email",
        populate: {
          path: "state",
          select: "name",
        },
      },
    ]);
    res.status(200).json(gifts);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
module.exports = { distributeGift, getGiftsByUID, getAllGifts };
