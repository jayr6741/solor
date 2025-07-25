const express = require("express");
const app = express();
const register = require("../../controller/Admin/register");
const {login, logout} = require("../../controller/Admin/login");
const dashboard = require("../../controller/Admin/dashbord");
const authToken = require("../../middleware/authToken");
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.use(authToken);
app.get("/dashboard", dashboard);

module.exports = app;
