var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var hbs = require("hbs");
var passport = require('passport');
var githubStrategy = require("passport-github2").Strategy;
var session = require('express-session');

var cors_options = {
  origin: "http://localhost:4200", // frontend url
  optionsSuccessStatus: 200,
};
// Router Objects
var indexRouter = require("./routes/index");
var expensesRouter = require("./routes/expenses");
var incomesRouter = require("./routes/incomes");
var overviewRouter = require("./routes/overview");
var categoryRouter = require("./routes/categories");
// Database Connectivity
const mongoose = require("mongoose");
const config = require("./config/globals");
// Import Passport and Session Modules
var passport = require("passport");
var session = require("express-session");
var User = require("./models/user");
// App Object Creation
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Partials
hbs.registerPartials(__dirname + "/views/partials");
// Helpers
// Helper for full date in Month (String), Day (Number), and Year (Number)
hbs.registerHelper("dateReformat", function (date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString(undefined, options);
});
// Helper to reformat the date to show in edit
hbs.registerHelper("dateEditFormat", function (date) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate() + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
});
// Helper for money format
hbs.registerHelper("moneyReformat", function (amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(cors_options));
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/chart.js/dist"))
);

// Configure Session object
app.use(
  session({
    secret: "financetracker",
    resave: false,
    saveUninitialized: false,
  })
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Initialize Passport Strategy
passport.use(User.createStrategy());
// Configuire GitHub Strategy
passport.use(new githubStrategy(
  // Options object
  {
    clientID: config.Authentication.GitHub.ClientId,
    clientSecret: config.Authentication.GitHub.ClientSecret,
    callbackURL: config.Authentication.GitHub.CallbackURL
  },
  // Callback function
  // Profile is GitHub profile
  async (accessToken, refreshToken, profile, done) => {
    // Search user by ID
    const user = await User.findOne({ oauthId: profile.id });
    // If User exists
    if (user) {
      return done(null, user);
    } else {
      // Register new user
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      // Add to DB
      const savedUser = await newUser.save()
      return done(null, savedUser);
    }
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/expenses", expensesRouter);
app.use("/incomes", incomesRouter);
app.use("/overview", overviewRouter);
app.use("/categories", categoryRouter);

mongoose
  .connect(config.ConnectionString.DB)
  .then((message) => {
    console.log("Connected successfully!");
  })
  .catch((err) => {
    console.log(`Error while connecting! ${err}`);
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
