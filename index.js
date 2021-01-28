require('dotenv').config()
require("firebase/functions");
const functions = require("firebase-functions");
const fapp = require("express")();
const cors = require("cors");
const firebase = require("firebase");
const firebaseConfig = require("./utils/firebaseConfig");
const indexRoutes = require("./routes/index");
firebase.initializeApp(firebaseConfig);


fapp.use(cors());
fapp.use("/", indexRoutes);

if (process.env.NODE_ENV === "development") {
    exports.api = functions.https.onRequest(fapp);
} else {
    exports.api = functions.region('us-central').https.onRequest(fapp);
}