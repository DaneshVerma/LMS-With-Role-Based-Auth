const express = require("express");
const app = express();
const signup = require("./routes/auth.routes");

app.use(express.json());

app.use("/auth", signup);

module.exports = app;
