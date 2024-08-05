var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var hbs = require('hbs');

var cors_options = {
  origin: 'http://localhost:4200', // frontend url
  optionsSuccessStatus: 200
}
// Router Objects
var indexRouter = require('./routes/index');
var expensesRouter = require("./routes/expenses");
var incomesRouter = require("./routes/incomes");
var overviewRouter = require("./routes/overview");
// Database Connectivity
const mongoose = require('mongoose');
const config = require('./config/globals');
// Import Passport and Session Modules
var passport = require("passport");
var session = require("express-session");
var User = require("./models/user");
// App Object Creation
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Partials setup
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(cors_options));

// Configure Session object
app.use(session({
  secret: "financetracker",
  resave: false,
  saveUninitialized: false
}));
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Initialize Passport Strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/expenses', expensesRouter);
app.use('/incomes', incomesRouter);
app.use('/overview', overviewRouter);

mongoose.connect(config.ConnectionString.DB)
  .then((message) => {
    console.log("Connected successfully!");
  })
  .catch((err) => {
    console.log(`Error while connecting! ${err}`);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
