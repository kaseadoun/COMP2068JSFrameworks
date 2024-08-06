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

// GET income and puts the sum based on the month on the bar chart
router.get('/income_data', AuthenticationMiddleware, async (req, res, next) => {
    const months = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0};

    try {
        let incomes = await Incomes.find({ user: req.user._id }).sort({ date: -1 });

        incomes.forEach(income => {
            const month = new Date(income.date.getMonth()).toLocaleString('default', { month: 'short' });
            months[month] += income.amount;
        });

        let chartData = {
            labels: Object.keys(months),
            datasets: [{
                data: Object.values(months)
            }],
            user: req.user
        };
        res.json(chartData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET expense and puts the sum based on the month on the bar chart
router.get('/expense_data', AuthenticationMiddleware, async (req, res, next) => {
    const months = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0};

    try {
        let expenses = await Expenses.find({ user: req.user._id }).sort({ date: -1 });

        expenses.forEach(expense => {
            let month = new Date(expense.date.getMonth()).toLocaleString('default', { month: 'short' });
            months[month] += expense.amount;
        });

        let chartData = {
            labels: Object.keys(months),
            datasets: [{
                data: Object.values(months)
            }],
            user: req.user
        };
        res.json(chartData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;