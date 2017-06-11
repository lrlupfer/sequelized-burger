var express = require("express");

var router = express.Router();

var db = require("../models/");

var burger = require("../models/burger.js");

//select all burgers from the db and render them
router.get("/", function(req, res) {
    db.Burgers.findAll().then(function(dbBurger) {
        console.log(dbBurger);
        var burgerObj = {
            burger: dbBurger
        };
        res.render("index", burgerObj);
    });
});

//post a new burger to the db
router.post("/", function(req, res) {
    db.Burgers.create(req.body).then(function(dbBurger) {
        //console.log(dbBurger);
        res.redirect("/");
  });
});

//update a burger's devoured status
router.put("/:id", function(req,res) {
  console.log(req.body);
    db.Burgers.update({
      devoured: true
    }, {
      where: {
          id: req.params.id
      }
    }).then(function(dbBurger) {
        res.redirect("/");
  });
});

//delete a burger from the database
router.delete("/:id", function(req,res) {
    db.Burgers.destroy ({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.redirect("/");
    });
});

module.exports = router;
