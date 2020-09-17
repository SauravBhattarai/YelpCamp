const express        = require('express'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      seedDB         = require('./seeds'),
      User           = require('./models/user');

// Importing routes
const campgroundsRoute = require('./routes/campgrounds'),
      authRoute        = require('./routes/auth'),
      commentRoute     = require("./routes/comments");

require('dotenv/config');

const app = express();


// Running seeds file to configure and restart data
// seedDB();

// Body parser
app.use(bodyParser.urlencoded({extended: true}));

// Making the directory "public" static 
app.use(express.static(__dirname + '/public'));

// Setting .ejs file to be viewed by default
app.set("view engine", "ejs");

// Paspport Configuration
app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Making username as global variable
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Landing Page Routes
app.get("/", (req, res) => {
    res.render("landingpage");
});

//Campgrounds Routes
app.use('/campgrounds', campgroundsRoute);

//Comments Routes
app.use('/campgrounds/:postId/comments/', commentRoute);

// Auth Routes
app.use('/user', authRoute);


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
    console.log("Yelp Camp Has Started at Server localhost://3000");
});




