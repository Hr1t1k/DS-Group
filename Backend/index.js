const express = require("express");
const path = require("path");
const connectDB = require("./config/dbConfig");
const userRoutes = require("./routes/userRoute");
const stateRoutes = require("./routes/stateRoute");
const giftRoutes = require("./routes/giftRoute");
const giftTrackingRoutes = require("./routes/giftTrackingRoute");
const { onRequest } = require("firebase-functions/v2/https");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB(); // connect to the database

try {
  app.use("/api/user", userRoutes);
  app.use("/api/state", stateRoutes);
  app.use("/api/gift", giftRoutes);
  app.use("/api/giftTracking", giftTrackingRoutes);
} catch (error) {
  console.log(error);
}
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
module.exports = app;
