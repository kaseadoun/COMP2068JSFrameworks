const express = require("express");
const router = express.Router();

const Expense = require("../models/expense");
const config = require("../config/globals");

router.get("/", (req, res, next) => {
    res.render('index', { title: 'Expenses' });
})

module.exports = router;