const { Schema, model } = require("mongoose");
const bannermodel = new Schema(
  {
    media: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("Banner", bannermodel);
