const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Expenses = require("../models/expense");
const Incomes = require("../models/income");
const AuthenticationMiddleware = require("../extensions/authentication");

// GET overview page
router.get('/', AuthenticationMiddleware, (req, res, next) => {
    res.render('overview', {title: "Overview", user: req.user});
});

router.get('/income_data', AuthenticationMiddleware, async (req, res, next) => {
    try {
        let incomes = await Incomes.find({ user: req.user._id }).sort({ date: -1 });

        let chartData = {
            labels: incomes.map(income => income.date.toISOString().split('T')[0]),
            datasets: [{
                data: incomes.map(income => income.amount)
            }],
            user: req.user
        };
        res.json(chartData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/expense_data', AuthenticationMiddleware, async (req, res, next) => {
    try {
        let expenses = await Expenses.find({ user: req.user._id }).sort({ date: -1 });

        let chartData = {
            labels: expenses.map(expense => expense.date.toISOString().split('T')[0]),
            datasets: [{
                data: expenses.map(expense => expense.amount)
            }],
            user: req.user
        };
        res.json(chartData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;