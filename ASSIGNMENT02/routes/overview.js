const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Expense = require("../models/expense");
const Incomes = require("../models/income");
const AuthenticationMiddleware = require("../extensions/authentication");

// GET overview page
router.get('/', AuthenticationMiddleware, (req, res, next) => {
    res.render('overview', {title: "Overview", user: req.user});
});

router.get('/income_data', AuthenticationMiddleware, async (req, res, next) => {
    try {
        let incomes = await Incomes.find().sort({ date: -1 });

        let chartData = {
            labels: incomes.map(income => income.date.toISOString().split('T')[0]),
            datasets: [{
                label: 'Income',
                data: incomes.map(income => income.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };
        res.json(chartData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;