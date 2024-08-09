const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Expenses = require("../models/expense");
const Incomes = require("../models/income");
const AuthenticationMiddleware = require("../extensions/authentication");

// GET overview page
router.get('/', AuthenticationMiddleware, async (req, res, next) => {
    // 2 async calls to be made to get both income and expense
    let [income, expense] = await Promise.all([
        Incomes.find({ user: req.user._id }).sort([["date", "ascending"]]),
        Expenses.find({ user: req.user._id }).sort([["date", "ascending"]])
    ]);
    // Reduce to get the final sum of both income and expense
    let incomeSum = income.reduce((totalIncome, incomeItem) => totalIncome + incomeItem.amount, 0);
    let expenseSum = expense.reduce((totalExpense, expenseItem) => totalExpense + expenseItem.amount, 0);
    // Get the net and set an empty string
    let net = incomeSum - expenseSum;
    let netMessage = "";
    // Based on net, sets message for user to know if they are making or losing money
    if (net < 0) {
        netMessage = "You are currently at a deficit."
    } else if (net > 0) {
        netMessage = "You are currently profiting."
    } else {
        netMessage = "You are currently breaking even."
    }
    // send to render
    res.render('overview', {
        title: "Overview", 
        user: req.user,
        totalIncome: incomeSum,
        totalExpense: expenseSum,
        net: net,
        netMessage: netMessage
    });
});

// GET income and puts the sum based on the month on the bar chart
router.get('/income_data', AuthenticationMiddleware, async (req, res, next) => {
    // Month object with respective values at 0
    const months = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0};
    try {
        // Get the income based on the accessible data and sort by date
        let incomes = await Incomes.find({ user: req.user._id }).sort({ date: -1 });
        // Iterate through the data and add to the respective month after reformatting and matching
        incomes.forEach(income => {
            const month = income.date.toLocaleString('default', { month: 'short' })
            months[month] += income.amount;
        });
        // Values required for the chart
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
// SAME LOGIC AS THE ONE ABOVE, BUT FOR EXPENSES
router.get('/expense_data', AuthenticationMiddleware, async (req, res, next) => {
    const months = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0};

    try {
        let expenses = await Expenses.find({ user: req.user._id }).sort({ date: -1 });

        expenses.forEach(expense => {
            let month = expense.date.toLocaleString('default', { month: 'short' });
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