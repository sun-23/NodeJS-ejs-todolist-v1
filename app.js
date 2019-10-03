//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public")); // app use express.static name "public"
app.set('view engine', 'ejs'); // ejs

const newItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {

  let day = date.getDate(); // get value from date.js module

  res.render("list", {
    listTitle: day,
    newListItems: newItems
  }); // ejs

});

app.post("/", function(req, res) {

  let newItem = req.body.newItem;

  if (req.body.listBtn === "Work List") { // check button from "/" page or "Work" page
    workItems.push(newItem); //add newItem to array workItems
    res.redirect("/Work"); //go to Work page
  } else {
    newItems.push(newItem) //add newItem to array newItems
    res.redirect("/"); //go to / page
  }
});

app.get("/Work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  }); // ejs
});

app.post("/Work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/Work"); //go to Work page
});

app.get("/About",function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started");
});
