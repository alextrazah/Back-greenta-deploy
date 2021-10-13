var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
// import mongoDB
var mongoose = require("mongoose");
var config = require("./database/mongodb");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var trashRouter = require("./routes/trash");
var postRouter = require("./routes/posts");
var whishlistRouter = require("./routes/whishlist");

var supporterRouter = require("./routes/supporters");
var teamRouter = require("./routes/teams");
var collectCenterRouter = require("./routes/collectCenters");
var collectorRouter = require("./routes/collectors");
var productRouter = require("./routes/products");
var fileupload = require('express-fileupload'); 

//Users Router

var app = express();
require("dotenv").config();

// mongo config
mongoose
  .connect(config.mongo.uri, {

    
    useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
  .then(() => console.log("Connected to Mongo"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(logger("dev"));
app.use(fileupload({useTempFiles: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
/* app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); */
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/trash", trashRouter);
app.use("/supporters", supporterRouter);
app.use("/teams", teamRouter);
app.use("/collectCenters", collectCenterRouter);
app.use("/collectors", collectorRouter);
app.use("/products", productRouter);
app.use("/posts", postRouter);
app.use("/whishlists", whishlistRouter);

//Package & delivery Module's middlewares

//Customer & Entreprise Module's middlewares

//User middlewares
app.use("/users", usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

//request limit 1gb

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
 

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
module.exports = app;
