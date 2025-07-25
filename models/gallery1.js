const mongoose = require("mongoose");

const Gallery1Schema = new mongoose.Schema({
  image: String,
});

module.exports = mongoose.model("Gallery1", Gallery1Schema);
    