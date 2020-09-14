const mongoose   = require('mongoose'),
      Campground = require('./models/addcampgrounds'),
      Comment    = require('./models/comments');


const camps = [
    {
        name: "Annapurna Base Camp",
        imageUrl: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "The best view of the tallest mountain you can ever lay eyes on"
    },
    {
        name: "Tilicho Camp",
        imageUrl: "https://images.pexels.com/photos/3703007/pexels-photo-3703007.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Camp at the bay of the highest alttide lake with water as blue as the color"
    },
    {
        name: "Pokhara Hill Camp",
        imageUrl: "https://images.pexels.com/photos/3932964/pexels-photo-3932964.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "With fresh air of the hills, you can't say no to the cozy experience of camping on a cold evening"
    }
];

function seedDB() {
    // Remove all Campgrounds
    Campground.remove({}, (error) => {
        if (error){
            console.log(error.message);
        } else {
            Comment.remove({}, (error) => {
                if (error){
                    console.log("Comment could nnot be removed sadly");
                    console.log(error.message);
                } else {
                    console.log("Comment was removed");
                }
            });
            
            console.log("Campgrounds removed");
            camps.forEach((seed) => {
                Campground.create(seed, (error, campground) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log("Added a Campground");
                        Comment.create({
                            text: "This is a great place to chill for a day or two and have your head cleared.",
                            author: "Rainbow Powell"
                        }, (error, comment) => {
                            if (error) {
                                console.log(error.message);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Comment created");
                            };
                        });
                    };
                });
            });    
        };
    });
};

module.exports = seedDB;


