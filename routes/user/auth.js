const express = require("express");
const app = express();

// Middleware
const { upload, convertToWebp } = require("../../middleware/multer");

// Controllers
const bannerController = require("../../controller/Banner/banner");
const productController = require("../../controller/product/product");
const reviewController = require("../../controller/review/review");
const contactController = require("../../controller/contact/contact");
const imagesController = require("../../controller/imageGallary/second");
const gallary1Controller = require("../../controller/imageGallary/gallary1");
const gallary2Controller = require("../../controller/imageGallary/gallary2");
const productHomeController = require("../../controller/imageGallary/product");

// ------------------------ BANNER ROUTES ------------------------ //
app.get("/banner", bannerController.getAllBanners);
app.post("/banner", upload.single("file"), convertToWebp, bannerController.createbanners);
app.put("/banner/:id", upload.single("file"), convertToWebp, bannerController.updateBanner);
app.delete("/banner/:id", bannerController.deleteBanner);

// ------------------------ PRODUCT ROUTES ------------------------ //
app.get("/product", productController.getAllProduct);
app.post("/product", upload.single("file"), convertToWebp, productController.createProduct);
app.put("/product/:id", upload.single("file"), convertToWebp, productController.updateProduct);
app.delete("/product/:id", productController.deleteProduct);

// ------------------------ REVIEW ROUTES ------------------------ //
app.get("/rating", reviewController.getAllReviews);
app.get("/ratinglimit", reviewController.getlimitReviews);
app.post("/rating", reviewController.review);
app.put("/rating/:id", reviewController.updateReview);
app.delete("/rating/:id", reviewController.deleteReview);

// ------------------------ CONTACT ROUTES ------------------------ //
app.get("/contact", contactController.getAllContacts);
app.post("/contact", contactController.createcontact);
app.put("/contact/:id", contactController.updateContact);
app.delete("/contact/:id", contactController.deleteContact);



// ------------------------ images ROUTES ------------------------ //

// ------------------------home secoond sec images ROUTES ------------------------ //
app.get("/images", imagesController.getAllImages)
app.post("/images", upload.single("file"), convertToWebp, imagesController.createimage)
app.put("/images/:id", upload.single("file"), convertToWebp, imagesController.updateImage)
app.delete("/images/:id", imagesController.deleteImage)

// ------------------------home gallary1 sec images ROUTES ------------------------ //
app.get("/imagesgallary1", gallary1Controller.getImages)
app.post("/imagesgallary1", upload.single("file"), convertToWebp, gallary1Controller.createimage)
app.put("/imagesgallary1/:id", upload.single("file"), convertToWebp, gallary1Controller.updateImage)
app.delete("/imagesgallary1/:id", gallary1Controller.deleteImage)
// ------------------------home gallary2 sec images ROUTES ------------------------ //
app.get("/imagesgallary2", gallary2Controller.getImages)
app.post("/imagesgallary2", upload.single("file"), convertToWebp, gallary2Controller.createimage)
app.put("/imagesgallary2/:id", upload.single("file"), convertToWebp, gallary2Controller.updateImage)
app.delete("/imagesgallary2/:id", gallary2Controller.deleteImage)
// ------------------------home product sec images ROUTES ------------------------ //
app.get("/producthome", productHomeController.getAllProducts)
app.post("/producthome", upload.single("file"), convertToWebp, productHomeController.createproduct)
app.put("/producthome/:id", upload.single("file"), convertToWebp, productHomeController.updateProduct)
app.delete("/producthome/:id", productHomeController.deleteProduct)

module.exports = app;
