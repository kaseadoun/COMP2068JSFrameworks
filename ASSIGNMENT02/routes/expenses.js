const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const AuthenticationMiddleware = require("../extensions/authentication");

// --------------------------------------------------------------- Index
router.get("/", AuthenticationMiddleware, async (req, res, next) => {
    let expenses = await Expense.find().sort([["date", "ascending"]]);
    res.render("expenses/index", {
        title: "Expenses",
        dataset: expenses
    });
});


// --------------------------------------------------------------- Add
router.get("/add", AuthenticationMiddleware, (req, res, next) => {
    res.render("expenses/add", {title: "New Expense"});
});

router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
    let newExpense = new Expense({
        expense: req.body.expense,
        category: req.body.category,
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description
    });
    await newExpense.save();
    
    res.redirect("/expenses");
});

// --------------------------------------------------------------- Update
router.get('/edit/:_id', AuthenticationMiddleware, async (req, res, next) => {
    let expenseId = req.params._id;
    let expenseData = await Expense.findById(expenseId);
    res.render("expenses/edit", {
        title: "Edit Expense Info",
        expense: expenseData
    });
});

router.post('/edit/:_id', AuthenticationMiddleware, async (req, res, next) => {
    let expenseId = req.params._id;
    await Expense.findByIdAndUpdate(
        {_id: expenseId},
        {
            expense: req.body.expense,
            category: req.body.category,
            date: req.body.date,
            amount: req.body.amount,
            description: req.body.description
        }
    );
    res.redirect('/expenses');
});

// --------------------------------------------------------------- Delete
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
    let expenseId = req.params._id;
    await Expense.findByIdAndDelete({ _id: expenseId });
    res.redirect("/expenses");
});

module.exports = router;