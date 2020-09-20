const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');


// Getting Register form
router.get("/register", (req, res) => {
    res.render("authen/register");
});

// Posting register form
router.post("/register", (req, res) => {
    User.register(new User({ username: req.body.username}),
                 req.body.password, 
                 (err, user) => {
                    if (err) {
                        console.log(err);
                        req.flash("error", err.message);
                        return res.redirect("/user/register");
                    }
                    passport.authenticate("local")(req, res, () => {
                        req.flash("success", "Successfully Registered");
                        res.redirect("/campgrounds");
                    });
    });
});

// Getting Login form
router.get("/login", (req, res) => {
    res.render("authen/login");
});


// Posting Login Form
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/user/login"
    }), (req, res) => {
        req.flash("success", "Logged In");
});

// Logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged Out");
    res.redirect("/");
});


// Exporting the Router 
module.exports = router;