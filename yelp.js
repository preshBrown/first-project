
// REFACTOR MONGOOSE CODE****************************
var express        = require('express'),
    bodyparser     = require('body-parser'),
    app            = express(),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require('./models/comment'),
    User           = require("./models/user"),
    seedDB         = require("./seeds")

    var host = "0.0.0.0";
    var port = process.env.PORT||5000;

    // Requiring routes
    var commentRoutes    = require("./routes/comments"), 
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes       = require("./routes/index")
        
        var DATABASEURL = "mongodb://localhost:27017/yelp_camp_v12Deployed";

        mongoose.connect(DATABASEURL,  {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
            if(err){
                console.log(err);
                console.log("DB ERROR");
            } else{console.log("DB CONNECTED")}
        });

  
  

    
    app.use(bodyparser.urlencoded({extended:true}));
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride('_method'));
    app.use(flash());
    // seedDB();  // seed the database

    // PASSPORT CONFIGURATION
    app.use(require("express-session")({
        secret: "Chris is the best R&B artist in the world ",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

   


    // USER SETUP
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");    
    next();
});

app.use("/", indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments", commentRoutes);

console.log("process env: "+ port)



app.listen(port, host, function(){
    console.log('server has started');
});


// app.listen(3000, function(){
//     console.log('yelpCamp server has started...');
// });
