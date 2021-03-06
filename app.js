var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var helloRouter = require("./routes/hello");
var foodRouter = require("./routes/food");
var orderRouter = require("./routes/order");
var payRouter = require("./routes/pay");
var db = require("./models/db");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var corsOptions = {
  origin: ["http://localhost:3000", "https://foodappfe.herokuapp.com"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // cookies and tokens allowed
};
app.use(cors(corsOptions));
app.use("/", indexRouter);
app.use("/auth", usersRouter);
app.use("/hello", helloRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);
app.use("/pay", payRouter);



// connect to DB
const mongoose = require("mongoose");

const url = `mongodb+srv://new_user1:mdbadminUser@cluster0.futvw.mongodb.net/foodAppDB?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// catch 404 and forward to error handler


app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
