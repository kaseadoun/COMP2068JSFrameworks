const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");

router.get("/", async (req, res, next) => {
    let expenses = await Expense.find().sort([["date", "ascending"]]);
    return res.status(200).json(expenses);
})

module.exports = router;