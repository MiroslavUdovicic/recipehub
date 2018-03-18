const express = require('express'),
      router = express.Router(),
      Recipe = require("../models/Recipe"),
      User = require("../models/User"),
      middleware = require("../middleware");


router.get("/show-recipes-category/soups/:page", function(req, res, next) {
  var perPage = 12;
  var page = req.params.page || 1;

  Recipe
    .find({category: "soups"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, recipes) {
      Recipe.count({category: "soups"}).exec(function(err, count) {
        if (err) return next(err)
        res.render("recipes/categories/soups", {
          recipes: recipes,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
});

router.get("/show-recipes-category/snacks/:page", function(req, res, next) {
  var perPage = 12;
  var page = req.params.page || 1;

  Recipe
    .find({category: "snacks"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, recipes) {
      Recipe.count({category: "snacks"}).exec(function(err, count) {
        if (err) return next(err)
        res.render("recipes/categories/snacks", {
          recipes: recipes,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
});


router.get("/show-recipes-category/breads/:page", function(req, res, next) {
  var perPage = 12;
  var page = req.params.page || 1;

  Recipe
    .find({category: "breads"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, recipes) {
      Recipe.count({category: "breads"}).exec(function(err, count) {
        if (err) return next(err)
        res.render("recipes/categories/breads", {
          recipes: recipes,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
});

router.get("/show-recipes-category/maincourses/:page", function(req, res, next) {
  var perPage = 12;
  var page = req.params.page || 1;

  Recipe
    .find({category: "mainCourse"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, recipes) {
      Recipe.count({category: "mainCourse"}).exec(function(err, count) {
        if (err) return next(err)
        res.render("recipes/categories/mainCourses", {
          recipes: recipes,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
});


router.get("/show-recipes-category/desserts/:page", function(req, res, next) {
  var perPage = 12;
  var page = req.params.page || 1;

  Recipe
    .find({category: "desserts"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, recipes) {
      Recipe.count({category: "desserts"}).exec(function(err, count) {
        if (err) return next(err)
        res.render("recipes/categories/desserts", {
          recipes: recipes,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
});


module.exports = router;
