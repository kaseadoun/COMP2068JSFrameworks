var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Finance Tracker', user: req.user });
});

// --------------------------------------------- Login
router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { title: "Login to Your Account", messages: messages, user: req.user});
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/incomes",
  failureRedirect: "/login",
  failureMessage: "Invalid Credentials",
}));

// --------------------------------------------- Register
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Create a New Account", user: req.user });
});

router.post("/register", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        return res.redirect("/register");
      } else {
        req.login(newUser, (err) => {
          res.redirect("/incomes");
        });
      }
    }
  );
});

// --------------------------------------------- Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

module.exports = router;
