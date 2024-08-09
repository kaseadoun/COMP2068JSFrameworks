var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Sample = require("../models/sample");
var passport = require("passport");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const months = {
    Jan: [0,0],
    Feb: [0,0],
    Mar: [0,0],
    Apr: [0,0],
    May: [0,0],
    Jun: [0,0],
    Jul: [0,0],
    Aug: [0,0],
    Sep: [0,0],
    Oct: [0,0],
    Nov: [0,0],
    Dec: [0,0],
  };

  let samples = await Sample.find();

  samples.forEach(sample => {
    for (const [key, value] of Object.entries(months)) {
      // Extract the index of the current month (Jan = 0, Feb = 1, etc.)
      const monthIndex = Object.keys(months).indexOf(key);

      // Safeguard against undefined values in income and expense arrays
      if (sample.income[monthIndex] !== undefined) {
        months[key][0] = sample.income[monthIndex];
      }
      if (sample.expense[monthIndex] !== undefined) {
        months[key][1] = sample.expense[monthIndex];
      }
    }
  });
  // console.log(samples)

  // for (const [key, value] of Object.entries(months)) {
  //   months[key][0] = samples.income[0]
  //   months[key][1] = samples.expense[0]
  // }

  samples.forEach(sample => {
    // sample.income.forEach((income, i) => {
    //   const month = Object.keys(months)[i];
    //   months[month][0] += income;
    // });
    // sample.expense.forEach((expense, i) => {
    //   const month = Object.keys(months)[i];
    //   months[month][1] += expense;
    // });
    console.log(sample);
  });

  // res.json(months);
  res.render("index", { 
    title: "Finance Tracker", 
    user: req.user,
    months: months
  });
});

// --------------------------------------------- Login
router.get("/login", (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", {
    title: "Login to Your Account",
    messages: messages,
    user: req.user,
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/overview",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials",
  })
);

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
          res.redirect("/overview");
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

// --------------------------------------------- GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res, next) => {
    res.redirect("/overview");
  }
);

module.exports = router;
