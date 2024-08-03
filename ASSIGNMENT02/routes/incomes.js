const express = require("express");
const router = express.Router();
const Income = require("../models/income");

// --------------------------------------------------------------- Index
router.get("/", async (req, res, next) => {
    let income = await Income.find().sort([["date", "ascending"]]);
    res.render("incomes/index", {
        title: "Income",
        dataset: income
    });
});

// --------------------------------------------------------------- Add
router.get("/add", (req, res, next) => {
    res.render("incomes/add", {title: "New Income"});
});

router.post("add", async (req, res, next) => {
    let newIncome = new Income({
        source: req.body.source,
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description        
    });
    await newIncome.save();

    res.redirect("/incomes");
});