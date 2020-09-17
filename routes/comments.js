const express = require('express'),
      router  = express.Router({mergeParams: true});

// // Import the DataBase schemas
const Comment      = require('../models/comments'),
      campgrounddb = require('../models/addcampgrounds');

// Creating a NEW form for submitting comment
router.get("/new", isLoggedIn, (req, res) => {
    campgrounddb.findById(req.params.postId, (error, campground) => {
        if (error) {
            console.log(error.message);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});


router.post("/", isLoggedIn, (req, res) => {
    campgrounddb.findById(req.params.postId, (error, campground) => {
        if (error) {
            console.log(error.message);
            res.redirect("/");
        } else {
            Comment.create(req.body.comment, (error, comment) => {
                if (error) {
                    console.log(error.message);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
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










// Exporting the Router 
module.exports = router;