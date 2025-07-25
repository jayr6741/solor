const mongoose = require("mongoose");

const Gallery2Schema = new mongoose.Schema({
    image: String,
});

module.exports = mongoose.model("Gallery2", Gallery2Schema);
