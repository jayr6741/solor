require("dotenv").config();
const express = require("express");
const path = require("path");
const mongodb = require("./database/db");
const v1 = require("./routes/v1");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
mongodb();

app.use("/v1", v1);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    
app.use("/uploads", express.static("uploads"));

// app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 3000;
app.listen(port,'0.0.0.0', () => console.log(`Example app listening on port ${port}!`));
