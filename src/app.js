const express = require("express");
const app = express();
const router = require("./routes/index.routes");

var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.use(express.urlencoded({ extended: true }));

module.exports = app;
