// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var port = process.env.PORT || 3306;

var app = express();

// Serve static content for the app from the "public" directory in the application directory
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
var routes = require("./controllers/burgers_controllers.js");

app.use("/", routes);

// Connect to db models (sequelize)
var db = require("./models");

db.sequelize.sync(/* { force: true } */).then(function() {
  app.listen(port, function() {
    console.log("App listening on port: " + port);
  });
});