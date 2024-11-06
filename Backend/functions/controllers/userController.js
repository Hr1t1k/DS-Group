const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
var mongoose = require("mongoose");
const admin = require("../config/firebaseConfig.js");
const addUser = asyncHandler(async (req, res) => {
  const { uid, email, name, stateId } = req.body;
  try {
    // Check if the user data is valid or not
    if (!uid) {
      res.status(400);
      throw new Error("Please provide valid uid");
    }

    const user = await User.create({ uid, name, email, state: stateId });
    res.status(200).send("User Created Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
const addAdminPrivilage = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.user;
    // Check if the user data is valid or not
    if (!uid) {
      res.status(400);
      throw new Error("Please provide valid uid");
    }

    admin
      .auth()
      .setCustomUserClaims(uid, { admin: true })
      .then(() => {
        admin
          .auth()
          .getUser(uid)
          .then((userRecord) => {
            console.log(uid);
            console.log(userRecord.customClaims["admin"]);
            res.status(200).send("Admin privilage added");
          });
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = { addUser, addAdminPrivilage };
