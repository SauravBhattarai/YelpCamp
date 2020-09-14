const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Importing the seed.js file
const seedDB = require('./seeds');
seedDB();

require('dotenv/config');

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Making the directory "public" static 
app.use(express.static(__dirname + '/public'));

// Setting .ejs file to be viewed by default
app.set("view engine", "ejs");


// Importing Campgrounds Routes
const campgroundsRoute = require('./routes/campgrounds');
app.use('/campgrounds', campgroundsRoute);

// Landing Page Routes
app.get("/", (req, res) => {
    res.render("landingpage");
});

// Undefined Route
app.get("*", (req, res) => {
    res.send("Page Not Found");
});


//Connecting to Database
mongoose.connect(process.env.DB_CONNECTION , {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to Database");
});

// Listening to Server
app.listen(3000, () => {
    console.log("Yelp Camp Server Has Started!");
});




