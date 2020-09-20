const express     = require('express'),
      router      = express.Router({mergeParams: true}),
      middlewares = require('../middlewares');

// // Import the DataBase schemas
const Comment      = require('../models/comments'),
      campgrounddb = require('../models/addcampgrounds');

// Creating a NEW form for submitting comment
router.get("/new", middlewares.isLoggedIn, (req, res) => {
    campgrounddb.findById(req.params.postId, (error, campground) => {
        if (error) {
            console.log(error.message);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Submitting new comment
router.post("/", middlewares.isLoggedIn, (req, res) => {
    campgrounddb.findById(req.params.postId, (error, campground) => {
        if (error) {
            console.log(error.message);
            res.redirect("/");
        } else {
            Comment.create(req.body.comment, (error, comment) => {
                if (error) {
                    req.flash("error", "Something went wrong. Please try again");
                    console.log(error.message);
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();

                    // Push comment to the campground
                    campground.comments.push(comment);
                    campground.save();
                    
                    req.flash("success", "Comment successfully added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Editing comments
router.get("/:commentId/edit", middlewares.isAuthorizedComment, (req, res) => {
    Comment.findById(req.params.commentId, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id : req.params.postId, comment: foundComment});
        }
    }); 
});

// Updating comment
router.put("/:commentId", middlewares.isAuthorizedComment, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.postId);
        };
    });
});

// Deleteing Comment
router.delete("/:commentId", middlewares.isAuthorizedComment, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if (err) {
            res.redirect("back");
            console.log(err.message);
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.postId);
        };
    });
});


// Exporting the Router 
module.exports = router;
