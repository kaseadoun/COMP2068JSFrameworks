const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");

router.get("/", async (req, res, next) => {
    let expenses = await Expense.find().sort([["date", "ascending"]]);
    // return res.status(200).json(expenses);
    res.render("expenses/index", {
        title: "Expenses",
        dataset: expenses
    });
});

router.post("/add", async (req, res, next) => {
    let newExpense = new Expense({
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        amount: req.body.amount
    });
    await newExpense.save();
    
    res.redirect("expenses");
});

module.exports = router;