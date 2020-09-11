const express = require('express');

const router = express.Router();

// Import the DataBase file
const campgrounddb = require('../models/addcampgrounds');

// try {
//     campgrounddb.create({
//         name: "Everest Base Camp",
//         imageUrl: "https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         description: "This is a beautiful site where you can enjoy the views of the mountain range all day and night. (Provided the weather is good, which it rarely is)"
//     });
// } catch (error) {
//     console.log(error);
// };

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

router.get("/add", (req, res) => {
    res.render("form");
});

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        const showPost = await campgrounddb.findById(postId);
        // console.log(showPost);
        res.render("show", {campground: showPost});
    } catch (error) {
        console.log(error);
    }
    
});

module.exports = router;