const express = require('express');

const router = express.Router();

// Import the DataBase file
const campgrounddb = require('../models/addcampgrounds');
const { json } = require('body-parser');

router.get("/", async (req, res) => {
    try {
        const allPosts = await campgrounddb.find();

        res.render("campgrounds", {campgrounds: allPosts});
    } catch (err) {
        console.log(err);
    };
    
});

router.post("/", async (req, res) => {

    // Get data from form and add to the database
    const newPost = new campgrounddb({
        name: req.body.name,
        imageUrl: req.body.imageUrl
    });

    try{
        await newPost.save();

        // Redirect to Campgrounds Page
        res.redirect("/campgrounds");
    } catch (err) {
        console.log(err);
    }

});

router.get("/add", (req, res) => {
    res.render("form");
});

module.exports = router;