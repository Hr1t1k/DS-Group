const admin = require("firebase-admin");

var serviceAccount = require("./getlucky-f839f-firebase-adminsdk-bluqe-4fa1564d89.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
