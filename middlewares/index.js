// Import the DataBase schemas
const Comment      = require('../models/comments'),
      campgrounddb = require('../models/addcampgrounds');


let middlewareObj = {};

// Authentication Middleware
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You need to be logged in first");
        res.redirect("/user/login");
    };
};

// Authorization Middleware for Campground
middlewareObj.isAuthorizedCampground = (req, res, next) => {
    if(req.isAuthenticated()) {
        campgrounddb.findById(req.params.postId, (err, foundCampground) => {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                };
            };
        }); 
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    };
};

// Authorization Middleware for Comment
middlewareObj.isAuthorizedComment = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, (err, foundComment) => {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                };
            };
        }); 
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    };
};


module.exports = middlewareObj;