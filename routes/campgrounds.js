var express = require("express");
var router  = express.Router();
var Campground    = require("../models/campground");
var middleware  = require("../middleware")


// INDEX - SHOW ALL CAMPGROUND
router.get('/', function(req, res){
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(" SOMTHING WENT WRONG");
            console.log(err);
        } else{
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });
});

// CREAT  - ADD NEW CAMPGROUND TO DB
router.post('/',middleware.isLoggedIn, function(req, res){
    // get data from form and add to the camp array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username 
    }
    var newCampground = {name:name, price:price, image:image, description:desc, author:author}
    // create new campground and save to data base
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(" SOMTHING WENT WRONG");
            console.log(err);
        } else{
            req.flash("success", "Added a new campground!")
            res.redirect('/campground');
        }
    });
})

// SHOW FORM TO CREATE NEW CAMPGROUND  
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new')
})

// SHOW =>  show more info about one campground
router.get('/:id', function(req,res){
    var id = req.params.id.trim()
    // find the campground with provided id
    Campground.findById(id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(" SOMTHING WENT WRONG");
            console.log(err);
        } else{
                // render show template with that campground 
    res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
                res.render ("campgrounds/edit", {campground: foundCampground});
     });
});

// ===========================================
// UPDATE
// ===========================================
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    var id = req.params.id.trim()
    // find and update the correct campground
    Campground.findByIdAndUpdate(id, req.body.campground,  function(err, updatedCampground){
        if(err){
            console.log("THERES A PROBLEM", err)
            res.redirect("/campground")
        } else{
            res.redirect ("/campground/" + req.params.id)
        }
      });
    });



// =========================================
// DELETE ROUTE
// =========================================
    router.delete("/:id/", middleware.checkCampgroundOwnership, function(req, res){
        var id = req.params.id.trim()
        // find and remove the correct campground
        Campground.findByIdAndRemove(id,  function(err){
            if(err){
                console.log("CANT DELETE...THERES A PROBLEM", err)
                res.redirect("/campground")
            } else{
                res.redirect ("/campground")
            }
          });
        });
    

module.exports = router;