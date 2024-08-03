const express = require("express");
const router = express.Router();
const Income = require("../models/income");

// --------------------------------------------------------------- Index
router.get("/", async (req, res, next) => {
    let income = await Income.find().sort([["date", "ascending"]]);
    res.render("incomes/index", {
        title: "Income",
        dataset: income
    });
});