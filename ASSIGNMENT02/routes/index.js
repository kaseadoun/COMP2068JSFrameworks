var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Sample = require("../models/sample");
var passport = require("passport");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { 
    title: "Finance Tracker"
  });
});

router.get("/index/sample_data", async (req, res, next) => {
  const months = {
    'Jan': [0,0],
    'Feb': [0,0],
    'Mar': [0,0],
    'Apr': [0,0],
    'May': [0,0],
    'Jun': [0,0],
    'Jul': [0,0],
    'Aug': [0,0],
    'Sep': [0,0],
    'Oct': [0,0],
    'Nov': [0,0],
    'Dec': [0,0],
  };

  let samples = await Sample.find();

  samples.forEach(sample => {
    for (const [key, value] of Object.entries(months)) {
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

  let chartData = {
    labels: Object.keys(months),
    datasets: [{
      data: Object.values(months)
    }]
  };

  console.log(Object.values(months))

  res.json(chartData);
})

// --------------------------------------------- Login
router.get("/login", (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", {
    title: "Login to Your Account",
    messages: messages,
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
  res.render("register", { title: "Create a New Account" });
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
