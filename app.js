const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

const campgrounds = [
    {name: "Everest Base Camp", image: "https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Annapurna Base Camp", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Rara Lake", image: "https://images.pexels.com/photos/2172499/pexels-photo-2172499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Everest Base Camp", image: "https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Annapurna Base Camp", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Rara Lake", image: "https://images.pexels.com/photos/2172499/pexels-photo-2172499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Rara Lake", image: "https://images.pexels.com/photos/2172499/pexels-photo-2172499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Rara Lake", image: "https://images.pexels.com/photos/2172499/pexels-photo-2172499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Rara Lake", image: "https://images.pexels.com/photos/2172499/pexels-photo-2172499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
];

app.get("/", (req, res) => {
    res.render("landingpage");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    
    const name = req.body.name;
    const image = req.body.image;

    const newCampground = {name: name, image: image};

    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/add", (req, res) => {
    res.render("form");
});

app.get("*", (req, res) => {
    res.send("Page Not Found");
});

app.listen(3000, () => {
    console.log("Yelp Camp Server Has Started!");
});




