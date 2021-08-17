var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var resumesRouter = require("./routes/api/resume");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const version = "v1";
app.use("/", indexRouter);
app.use(`api/${version}/users`, usersRouter);
app.use(`api/${version}/resumes`, resumesRouter);

module.exports = app;
