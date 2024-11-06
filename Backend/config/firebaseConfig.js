const admin = require("firebase-admin");

var serviceAccount = require("./getlucky-f839f-firebase-adminsdk-bluqe-8a5a2943ab.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
