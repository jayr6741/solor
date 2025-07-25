const mongoose = require("mongoose");


const SecondSchema = new mongoose.Schema({
  image: String,
});

const gallary1Schema = new mongoose.Schema({
    image: String,
});

const ProductSchema = new mongoose.Schema({
    title: String,
    description: Number,
    image: String,
});

const gallary2Schema = new mongoose.Schema({
    image: String,
});
const Second = mongoose.model('Second', SecondSchema);
const gallary1 = mongoose.model('gallary1', gallary1Schema);
const Product = mongoose.model('Product', ProductSchema);
const gallary2 = mongoose.model('gallary2', gallary2Schema);


module.exports = {
    Second,
    gallary1,
    Product,
    gallary2,
}
