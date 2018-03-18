var express = require("express");
var router  = express.Router();
var Recipe  = require("../models/Recipe");
var Comment  = require("../models/Comment");
var middleware = require("../middleware");

router.get("/recipes/:id/comments/new", middleware.isLoggedIn, function (req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {recipe: recipe});
    }
  });
});

router.post("/recipes/:id/comments", middleware.isLoggedIn, function (req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) {
      console.log(err);
      res.redirect("/recipes");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.author.profilePic = req.user.profilePic;
          comment.save();
          recipe.comments.push(comment);
          recipe.save();
          req.flash("success", "You've added comment!");
          res.redirect("/recipes/" + recipe._id);
        }
      });
    }
  });
});


// //EDIT COMMENT
// router.get("/recipes/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
//   Comment.findById(req.params.comment_id, function (err, foundComment) {
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.render("comments/edit", {recipe_id: req.params.id, comment: foundComment});
//     }
//   });
// });
//
// //UPDATE COMMENT
// router.put("/recipes/:id/comments/:comment_id", middleware.checkCommentOwnership, function (req, res) {
//   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
//     if (err) {
//       res.redirect("back");
//     } else {
//       req.flash("success", "Comment edited!");
//       res.redirect("/recipes/" + req.params.id);
//     }
//   });
// });

//DELETE ROUTE
router.delete("/recipes/:id/comments/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect("/recipes/" + req.params.id);
    }
  });
});


module.exports = router;
