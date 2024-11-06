const asyncHandler = require("express-async-handler");
const State = require("../models/stateModel.js");
var mongoose = require("mongoose");

const addState = asyncHandler(async (req, res) => {
  const { name, distributionLimit } = req.body;
  try {
    // Check if the data is valid or not
    if (!name || distributionLimit < 0 || distributionLimit > 100) {
      res.status(400);
      throw new Error("Please provide valid data");
    }

    const state = await State.create({ name, distributionLimit });
    res.status(200).json(state);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getAllState = asyncHandler(async (req, res) => {
  try {
    const state = await State.find();
    res.status(200).json(state);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { addState, getAllState };
