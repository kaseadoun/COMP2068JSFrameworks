const express = require('express');
const router = express.Router();
const Category = require("../models/category");
const AuthenticationMiddleware = require("../extensions/authentication");

// Gets the category data and renders it for the page
router.get('/', AuthenticationMiddleware, async (req, res, next) => {
    let categories = await Category.find({ user: req.user._id }).sort([["name", "descending"]]);
    res.render("categories/index", {
        title: "All Expense Categories",
        dataset: categories,
        user: req.user,
    });
});
// ------------------------------------------------------- ADDING
// Gets the add page and renders it
router.get('/add', AuthenticationMiddleware, async (req, res, next) => {
    res.render("categories/add", { title: "Add an Expense Category", user: req.user});
});
// Adds the new category into the collection
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
    let newCategory = new Category({
        user: req.user._id,
        name: req.body.name
    });

    await newCategory.save();
    res.redirect("/categories");
});
// ------------------------------------------------------- EDITING
router.get('/edit/:_id', AuthenticationMiddleware, async(req, res, next) => {
    let categoryId = req.params._id;
    let categoryData = await Category.findById(categoryId);
    res.render("categories/edit", {
        title: "Edit Category",
        category: categoryData,
        user: req.user
    });
});

router.post('/edit/:_id', AuthenticationMiddleware, async(req, res, next) => {
    let categoryId = req.params._id;
    await Category.findByIdAndUpdate(
        {_id: categoryId},
        {
            user: req.user._id,
            name: req.body.name
        }
    )
});
// ------------------------------------------------------- DELETING
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
    let categoryId = req.params._id;
    await Category.findByIdAndDelete({ _id: categoryId, user: req.user});
    res.redirect("/categories");
});

module.exports = router;