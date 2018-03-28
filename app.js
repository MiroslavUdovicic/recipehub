const express         = require('express'),
      app             = express(),
      mongoose        = require('mongoose'),
      bodyParser      = require('body-parser'),
      passport        = require('passport'),
      LocalStrategy   = require('passport-local'),
      methodOverride  = require('method-override'),
      flash           = require('connect-flash'),
      moment          = require('moment'),
      indexRoutes     = require('./routes/index'),
      recipesRoutes   = require('./routes/recipes'),
      categoriesRoutes= require('./routes/categories'),
      commentsRoutes  = require('./routes/comments'),
      Restaurant      = require("./models/Recipe"),
      Comment         = require("./models/Comment"),
      User            = require("./models/User");


moment().format();

require('dotenv').config();

mongoose.Promise  = require('bluebird');
mongoose.connect(process.env.DB_DATABASE);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require('moment');

app.use(require("express-session")({
  secret: "Gelor Kanga",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use(recipesRoutes);
app.use(categoriesRoutes);
app.use(commentsRoutes);


app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started on port 3000!");
});
