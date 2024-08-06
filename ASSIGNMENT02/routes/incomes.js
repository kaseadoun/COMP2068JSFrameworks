const express = require("express");
const router = express.Router();
const Income = require("../models/income");
const AuthenticationMiddleware = require("../extensions/authentication");

// --------------------------------------------------------------- Index
router.get("/", AuthenticationMiddleware, async (req, res, next) => {
  let income = await Income.find({ user: req.user._id }).sort([["date", "ascending"]]);
  res.render("incomes/index", {
    title: "Income",
    dataset: income,
    user: req.user
  });
});

// --------------------------------------------------------------- Add
router.get("/add", AuthenticationMiddleware, (req, res, next) => {
  res.render("incomes/add", { title: "New Income", user: req.user });
});

router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  let newIncome = new Income({
    user: req.user._id,
    source: req.body.source,
    date: req.body.date,
    amount: req.body.amount,
    description: req.body.description,
  });
  await newIncome.save();

  res.redirect("/incomes");
});

// -------------------------------------------------------------- Update
router.get("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let incomeId = req.params._id;
  let incomeData = await Income.findById(incomeId);
  res.render("incomes/edit", {
    title: "Edit Income Info",
    income: incomeData,
    user: req.user
  });
});

router.post("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let incomeId = req.params._id;
  await Income.findByIdAndUpdate(
    { _id: incomeId },
    {
      user: req.user._id,
      source: req.body.source,
      date: req.body.date,
      amount: req.body.amount,
      description: req.body.description,
    }
  );
  res.redirect("incomes");
});

// --------------------------------------------------------------- Delete
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let incomeId = req.params._id;
  await Income.findByIdAndDelete({ _id: incomeId, user: req.user });
  res.redirect("/incomes");
});

module.exports = router;
