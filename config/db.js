const MONGO_URI = require("./dbconfig").MONGO_URI;
const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};
