// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require("cookie-session");
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));
// global object initiated to move data across endpoints
let liked = {};
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/map", usersRoutes(db));
app.use("/edit", widgetsRoutes(db));

//endpoint for when user clicks login button
app.post("/login", (req, res) =>{
  req.session.user_id = req.body.user;
  let loginVar = req.session.user_id;
  res.redirect("/");
});
//endpoint for when the home page loads
app.get("/", (req, res) => {
  let loginVar = req.session.user_id;
  res.render("home", {loginVar});
});
//endpoint for when profile page loads
app.get("/profile", (req,res) => {
  let loginVar = req.session.user_id;
  res.render("profile", {loginVar});
});
//endpoint for when logout button is pressed
app.post("/logout", (req, res) =>{
  req.session.user_id = null;
  res.redirect("/");
});
//endpoint for when anywhere on the site needs to load the pins table
app.get("/load", (req,res) => {
  let query = `SELECT * FROM pins;`;
  db.query(query)
    .then(data => {
      let test = data.rows;
      res.json(test);
    });
});
//endpoint for when the profile page tries to load the favourite related data
app.get("/like", (req, res)=>{
  let query = `SELECT * FROM maps;`;
  db.query(query)
    .then(data =>{
      res.json(data.rows);
    });
});
//endpoint for when user clicks the like button on the home page
app.post("/like/:user/:mapid", (req, res) =>{
  //console.log(req.params);
  let insert = `INSERT INTO maps (id, username)
  VALUES ($1, $2) RETURNING *;`;
  if (!liked[req.params.mapid]) {
    db.query(insert, [req.params.mapid, req.params.user])
      .then(data =>{
        console.log("inserted into maps");
        res.redirect("/");
      //res.end();
      });
  }
  //using a variable liked to move information across endpoints
  liked[req.params.mapid] = req.params.user;
  console.log(liked);
  res.redirect("/");
  let loginVar = req.session.user_id;
});

//endpoint for when the map page loads
app.get("/map", (req,res) => {
  let loginVar = req.session.user_id;
  console.log("before loading map");
  res.render("map", {loginVar});
});

//endpoint for when the create page loads
app.get("/edit",(req,res) =>{
  let loginVar = req.session.user_id;
  res.render('edit', {loginVar});
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
