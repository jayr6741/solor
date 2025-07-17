const mongoose = require("mongoose");
const mongodb = () => {
  mongoose
    .connect(process.env.url || "mongodb://localhost:27017/solar")
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((err) => {
      console.log("err", err);
    });
};
module.exports = mongodb;
