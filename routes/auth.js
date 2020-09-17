const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();


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
                        return res.redirect("/user/register");
                    }
                    passport.authenticate("local")(req, res, () => {
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
});

// Logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// Exporting the Router 
module.exports = router;