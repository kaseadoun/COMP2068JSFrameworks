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

// -------------------------------------------------------------- Update
router.get("/edit/:_id", async (req, res, next) => {
    let incomeId = req.params._id;
    let incomeData = await Income.findById(incomeId);
    res.render("incomes/edit", {
        title: "Edit Income Info",
        income: incomeData
    });
});

router.post("/edit/:_id", async(req, res, next) => {
    let incomeId = req.params._idl
    await Income.findByIdAndUpdate(
        {_id: incomeId},
        {
            source: req.body.source,
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description   
        }
    );
    res.redirect("incomes");
});

// --------------------------------------------------------------- Delete
router.get("/delete/:_id", async (req, res, next) => {
    let incomeId = req.params._id;
    await Income.findByIdAndDelete({ _id: incomeId });
    res.redirect("/incomes");
});

module.exports = router;