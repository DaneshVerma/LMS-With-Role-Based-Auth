const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const signup = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");


app.use(express.json());
app.use(cookieParser());

app.use("/auth", signup);
app.use("/admin", adminRoutes);

module.exports = app;
