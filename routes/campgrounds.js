const express = require('express');

const router = express.Router();

const Comment = require('../models/comments');
// // Import the DataBase file
const campgrounddb = require('../models/addcampgrounds');


// Show route
router.get("/", async (req, res) => {
    try {
        const allPosts = await campgrounddb.find();

        res.render("campgrounds", {campgrounds: allPosts});
    } catch (err) {
        console.log(err);
    };
    
});

// Posting a new campground
router.post("/", async (req, res) => {

    // Get data from form and add to the database
    const newPost = new campgrounddb({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    });

    try{
        await newPost.save();
        // Redirect to Campgrounds Page
        res.redirect("/campgrounds");
    } catch (err) {
        console.log(err);
    }

});

// New campground form
router.get("/add", (req, res) => {
    res.render("form");
});

// Show the specific post
router.get("/:postId", (req, res) => {
    const postId = req.params.postId;
    try {
        campgrounddb.findById(postId).populate({path: "comments", model: Comment}).exec((error, showPost) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log(showPost);
                res.render("show", {campground: showPost});
            }
        });
    } catch (error) {
        console.log(error.message);
    }
});

// Exporting the Router 
module.exports = router;