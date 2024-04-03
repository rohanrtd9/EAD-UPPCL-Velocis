// external imports
const mongoose = require("mongoose");
//require("dotenv").config();

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  let DB_URL;
  if (process.env.DEPLOY_TYPE === "test") {
    DB_URL = process.env.DB_URL_TEST;
  } else if (process.env.DEPLOY_TYPE === "prod") {
    DB_URL = process.env.DB_URL_PROD;
  } else {
    console.log("Error: DEPLOY_TYPE not set");
    return;
  }
  mongoose.set("strictQuery", false);
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
      //console.log(db)
      //return db;
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
