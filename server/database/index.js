const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/vue-admin";

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb server connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mongoose;
