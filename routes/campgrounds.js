const express = require('express'),
      router  = express.Router({mergeParams: true});

// // Import the DataBase schemas
const Comment      = require('../models/comments'),
      campgrounddb = require('../models/addcampgrounds');


// INDEX route
router.get("/", async (req, res) => {
    try {
        const allPosts = await campgrounddb.find();
        res.render("campgrounds/campgrounds", {campgrounds: allPosts});
    } catch (err) {
        console.log(err);
    };
});

// NEW campground form
router.get("/add", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});


// Posting a new campground
router.post("/", isLoggedIn, async (req, res) => {

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

// SHOWS the specific post
router.get("/:postId", (req, res) => {
    const postId = req.params.postId;
    try {
        campgrounddb.findById(postId).populate({path: "comments", model: Comment}).exec((error, showPost) => {
            if (error) {
                console.log(error.message);
            } else {
                // console.log(showPost);
                res.render("campgrounds/show", {campground: showPost});
            }
        });
    } catch (error) {
        console.log(error.message);
    }
});

// Authentication Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/user/login");
    };
};



// Exporting the Router 
module.exports = router;