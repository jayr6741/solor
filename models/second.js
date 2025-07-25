const mongoose = require("mongoose");

const SecondSchema = new mongoose.Schema({
  image: String,
});

module.exports = mongoose.model("Second", SecondSchema);
