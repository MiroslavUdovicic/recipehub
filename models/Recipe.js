var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  description: String,
  ingredients: [],
  instructions: String,
  time: Number,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    profilePic: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Recipe", recipeSchema);
