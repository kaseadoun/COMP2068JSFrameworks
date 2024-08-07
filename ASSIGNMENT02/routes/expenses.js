const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const Category = require("../models/category");
const AuthenticationMiddleware = require("../extensions/authentication");

// --------------------------------------------------------------- Index
router.get("/", AuthenticationMiddleware, async (req, res, next) => {
    let expenses = await Expense.find({ user: req.user._id }).sort([["date", "ascending"]]);

    let expenseSum = expenses.reduce((totalExpense, expenseItem) => totalExpense + expenseItem.amount, 0);

    res.render("expenses/index", {
        title: "Expenses",
        dataset: expenses,
        user: req.user,
        totalExpense: expenseSum
    });
});


// --------------------------------------------------------------- Add
router.get("/add", AuthenticationMiddleware, async (req, res, next) => {
    let categoryList = await Category.find().sort([["name", "ascending"]]);

    res.render("expenses/add", {
        title: "New Expense",
        categories: categoryList, 
        user: req.user});
});

router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
    let newExpense = new Expense({
        user: req.user._id,
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
    let categoryList = await Category.find().sort([["name", "ascending"]]);
    res.render("expenses/edit", {
        title: "Edit Expense Info",
        expense: expenseData,
        categories: categoryList, 
        user: req.user
    });
});

router.post('/edit/:_id', AuthenticationMiddleware, async (req, res, next) => {
    let expenseId = req.params._id;
    await Expense.findByIdAndUpdate(
        {_id: expenseId},
        {
            user: req.user._id,
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
    await Expense.findByIdAndDelete({ _id: expenseId, user: req.user });
    res.redirect("/expenses");
});

module.exports = router;