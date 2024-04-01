var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
        if(req.isAuthenticated()){
            var id = req.params.id.trim()
            // is user logged in?
            Campground.findById(id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground not found")
                    res.redirect("back")
                } else{
                // does the user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) {
                   next()
                } else{
                    req.flash("error", "Wrong users. not permitted" )
                    res.redirect("back")
                }
                   
                }
              });
        } else{
            req.flash("error", "You need to be logged in to do that")
            res.redirect("back")
        }
    
    }

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        // is user logged in?
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err)
                res.redirect("back")
            } else{
            // does the user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
               next()
            } else{
                req.flash("error", "Wrong users. not permitted" )
                res.redirect("back")
            }
               
            }
          });
    } else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back")
    }

}


middlewareObj.isLoggedIn =  function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "you need to be logged in to do that ")
    res.redirect("/login");
}

module.exports = middlewareObj
