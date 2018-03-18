var Recipe = require("../models/Recipe");
var Comment = require("../models/Comment");
var User = require("../models/User");

var middlewareObj = {};

middlewareObj.checkRecipeOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Recipe.findById(req.params.id, function (err, foundRecipe) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundRecipe.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect("back");
        }
      }
    });
    } else {
      req.flash("error", "You need to be logged in!");
      res.redirect("back");
    }
  };




  middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
          res.redirect("back");
        } else {
          if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that!");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "You need to be logged in!");
      res.redirect("back");
    }
  };


  middlewareObj.checkUserOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
      User.findById(req.params.id, function (err, foundUser) {
        if (err) {
          res.redirect("back");
        } else {
          if (foundUser._id.equals(req.user._id) || req.user.isAdmin) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that!");
            res.redirect("/restaurants");
          }
        }
      });
      } else {
        req.flash("error", "You need to be logged in!");
        res.redirect("back");
      }
    };




middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in!");
  res.redirect("/");
};

module.exports = middlewareObj;
