const express     = require('express'),
      router      = express.Router({mergeParams: true}),
      middlewares = require('../middlewares');

// Import the DataBase schemas
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
router.get("/add", middlewares.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});


// Posting a new campground
router.post("/", middlewares.isLoggedIn, async (req, res) => {
    try{
        // Get data from form and add to the database
        const newPost = new campgrounddb({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        });

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

// Edit Campground Route
router.get("/:postId/edit", middlewares.isAuthorizedCampground, (req, res) => {
    campgrounddb.findById(req.params.postId, (err, foundCampground) => {
        if (err) {
            console.log(err.message);
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })    
});


// Update Campground Route
router.put("/:postId", middlewares.isAuthorizedCampground, (req, res) => {
    // Find the campground by id and update
    campgrounddb.findByIdAndUpdate(req.params.postId, req.body.campground, (err, updatedCampground) => {
        if (err) {
            console.log(err.message);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.postId);
        }
    });
    // Redirect to the show page
})

// Destroy Campround Route
router.delete("/:postId", middlewares.isAuthorizedCampground, (req, res) => {
    campgrounddb.findByIdAndRemove(req.params.postId, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

// Exporting the Router 
module.exports = router;