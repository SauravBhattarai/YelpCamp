// Import the DataBase schemas
const Comment      = require('../models/comments'),
      campgrounddb = require('../models/addcampgrounds');


let middlewareObj = {};

// Authentication Middleware
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/user/login");
    };
};

// Authorization Middleware for Campground
middlewareObj.isAuthorizedCampground = (req, res, next) => {
    if(req.isAuthenticated()) {
        campgrounddb.findById(req.params.postId, (err, foundCampground) => {
            if (err) {
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                };
            };
        }); 
    } else {
        res.redirect("back");
    };
};

// Authorization Middleware for Comment
middlewareObj.isAuthorizedComment = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                };
            };
        }); 
    } else {
        res.redirect("back");
    };
};


module.exports = middlewareObj;