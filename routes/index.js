const express       = require('express'),
      router        = express.Router(),
      User          = require("../models/User");
      Recipe        = require("../models/Recipe");
      passport      = require("passport");
      LocalStrategy = require("passport-local");
      middleware    = require("../middleware");



router.get("/", function (req, res) {
  Recipe.aggregate(
   [
      {$project: {item: 1, numberOfComments: { $size: "$comments" }}},
      {$sort: {numberOfComments: -1}},
      {$limit: 8}
   ],function (err, popularRecipes) {
  if (err) {
    console.log(err);
  } else {
    Recipe.find({_id:popularRecipes}, function (err, recipes) {
      if (err) {
        console.log(err);
      } else {
        res.render("landing", {recipes: recipes});
      }
    })
  }
} )
});

router.get("/contact", function (req, res) {
  res.render("contact");
})

router.get("/register", function (req, res) {
  res.render("register");
});


router.post("/register", function (req, res) {
  var newUser = new User(
    {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      profilePic: req.body.profilePic
    });
  if (req.body.adminCode === "jasamadmir") {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome " + user.username);
      res.redirect("/");
    });
  });
});

router.post("/login", passport.authenticate("local",
{
  successRedirect: "/",
  failureRedirect: "/"
}), function (req, res) {
});

//LOG out
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Successfuly logged out!")
  res.redirect("/");
});

//USER PROFILE
router.get("/users/:id", function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      req.flash("error", "Can't find the user.");
    }
    Recipe.find().where('author.id').equals(foundUser._id).exec(function (err, recipes) {
      if (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/");
      }
      res.render("users/show", {user: foundUser, recipes: recipes});
    });
  });
});

// EDIT USER PROFILE
router.get("/users/:id/edit", middleware.checkUserOwnership, function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      req.flash("Something went wrong!");
      res.redirect("back");
    } else {
      res.render("users/edit", {user: foundUser});
    }
  });
});

//UPDATE USER PROFILE
router.put("/users/:id", function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, function (err, updatedUser) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Profile updated!");
      res.redirect("/users/" + updatedUser._id);
    }
  });
});

module.exports = router;
