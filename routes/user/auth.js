const express = require("express");
const app = express();
const { upload, convertToWebp } = require("../../middleware/multer");
const bannerall = require("../..//controller/Banner/banner");
const product = require("../../controller/product/product");
const rating = require("../..//controller/review/review");
const contact = require("../../controller/contact/contact");

// all banner routes
app.get("/banner", bannerall.getAllBanners);
app.post("/banner", upload.single("file"), convertToWebp, bannerall.createbanners);
app.put("/banner/:id", upload.single("file"), convertToWebp, bannerall.updateBanner);
app.delete("/banner/:id", bannerall.deleteBanner);

//all product rotes
app.get("/product", product.getAllProduct);
app.post("/product", upload.single("file"), convertToWebp, product.createProduct);
app.put("/product/:id", upload.single("file"), convertToWebp, product.updateProduct);
app.delete("/product/:id", product.deleteProduct);

// all review rotes
app.get("/rating", rating.getAllReviews)
app.get("/ratinglimit", rating.getlimitReviews)
app.post("/rating", rating.review)
app.put("/rating/:id", rating.updateReview)
app.delete("/rating/:id", rating.deleteReview)

//all contact
app.post("/contact", contact.createcontact)
app.get("/contact", contact.getAllContacts)
app.put("/contact/:id", contact.updateContact)
app.delete("/contact/:id", contact.deleteContact)

module.exports = app;
