const express    = require('express'),
      router     = express.Router(),
      Recipe     = require("../models/Recipe"),
      User       = require("../models/User"),
      middleware = require("../middleware");


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/show-recipes/:page", function (req, res, next) {
  var perPage = 12;
  var page = req.params.page || 1;


  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Recipe.find({name: regex}, function (err, recipes) {
      if (err) {
        console.log(err);
      } else {
        res.render("recipes/index", {recipes: recipes});
      }
    });
  } else {
    Recipe
         .find({})
         .skip((perPage * page) - perPage)
         .limit(perPage)
         .exec(function(err, recipes) {
             Recipe.count().exec(function(err, count) {
                 if (err) return next(err)
                 res.render("recipes/index", {
                     recipes: recipes,
                     current: page,
                     pages: Math.ceil(count / perPage)
                 })
             })
         })
  }
});


router.post("/recipes/", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var category = req.body.category;
  var image = req.body.image;
  var time = req.body.time;
  var ingredients = req.body.ingredients;
  var description = req.body.description;
  var instructions = req.body.instructions;
  var author = {
    id: req.user._id,
    username: req.user.username,
    profilePic: req.user.profilePic
  }
  var newRecipe = {name: name, category:category, image: image, time:time, ingredients: ingredients, description: description, instructions:instructions, author: author}
  Recipe.create(newRecipe, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Recipe successfuly added!");
      res.redirect("/show-recipes/1");
    }
  });
});

router.get("/recipes/new", middleware.isLoggedIn, function (req, res) {
  res.render("recipes/new");
});

//SHOW ROUTE
router.get("/recipes/:id", function (req, res) {
  Recipe.findById(req.params.id).populate("comments").exec(function (err, foundRecipe) {
    if (err) {
      console.log(err);
    } else {
      res.render("recipes/show", {recipe: foundRecipe,});
    }
  });
});

//EDIT ROUTE
router.get("/recipes/:id/edit", middleware.checkRecipeOwnership, function (req, res) {
  Recipe.findById(req.params.id, function (err, foundRecipe) {
    if (err) {
      console.log(err);
    } else {
      res.render("recipes/edit", {recipe: foundRecipe});
    }
  });
});

//UPDATE ROUTE
router.put("/recipes/:id", middleware.checkRecipeOwnership, function (req, res) {
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function (err, updatedRecipe) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Recipe updated!");
      res.redirect("/recipes/" + updatedRecipe._id);
    }
  });
});

//DELETE ROUTE
router.delete("/recipes/:id", middleware.checkRecipeOwnership, function (req, res) {
  Recipe.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Recipe deleted");
      res.redirect("/show-recipes/1");
    }
  });
});

module.exports = router;
