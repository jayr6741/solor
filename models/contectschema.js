const mongoose = require("mongoose");
const contact = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    number: {
      type: Number,
      min: [1000000000, "Enter a valid 10-digit number"],
      max: [9999999999, "Enter a valid 10-digit number"],
      required: true,
    },
    title: {
      type: String,
      // enum: {
      //   values: ["Home", "Business", "Farm", "Factory", "Other"],
      //   message: "Title must be one of Home, Business, Farm, Factory, Other",
      // },
    },
    message: {
      type: String,
      maxlength: [1000, "Message should not exceed 1000 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact", contact);
