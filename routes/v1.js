const express = require("express");
const app = express();
const user = require("./user/auth");
const admin = require("./admin/auth");
app.use("/user", user);
app.use("/admin", admin);

module.exports = app;
