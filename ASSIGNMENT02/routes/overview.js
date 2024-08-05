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

module.exports = router;