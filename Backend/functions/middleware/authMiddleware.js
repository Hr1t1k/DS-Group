const asyncHandler = require("express-async-handler");
const admin = require("../config/firebaseConfig");

const protect = asyncHandler(async (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    if (!decodedToken) {
      res.status(400);
      throw new Error("User Unauthorised");
    }
    next();
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
