var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware  = require("../middleware")

//=======================================================
//                  COMMENTS ROUTES
// ======================================================

// comments new
router.get('/new', middleware.isLoggedIn, function(req, res){

    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
     if(err){
         console.log(" SOMTHING WENT WRONG");
         console.log(err);
     } else{
             // render show template with that campground 
 res.render('comments/new', {campground: campground});
     }
 });
})

// comments create
router.post('/', middleware.isLoggedIn, function(req, res){
 // lookup campground using ID
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             req.flash("error", "Something went wrong")
             console.log(err);
             res.redirect("/campground")
         } else{
             // create new comment
             Comment.create(req.body.comment, function(err, comment){
                 if(err){
                     console.log(err);
                 } else{
                    //  add username and id to comment
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                  // save comment
                    comment.save();
                      // connect new comment to campground
                     campground.comments.push(comment);
                     campground.save();
                     req.flash("success", "Successfully added comment")
                     // redirect campground show page
                     res.redirect('/campground/' + campground._id);
                 }
             })
         }
     });
})

// =============================
// EDIT COMMENT ROUTE
// =============================
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
             res.redirect("back")
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
        }
    })
});

// ================================
// ROUTE UPDATE EDITED COMMENT
// ================================
router.put("/:comment_id/",middleware.checkCommentOwnership, function(req, res) {
    var id = req.params.comment_id.trim()
    // find and update the correct comment
    Comment.findByIdAndUpdate(id, req.body.comment,  function(err, updatedCampground){
        if(err){
            console.log("THERES A PROBLEM", err)
            res.redirect("back")
        } else{
            res.redirect ("/campground/" + req.params.id);
        }
      });
});



// =========================================
// ROUTE DELETES SPECIFIC COMMENT
// =========================================
router.delete("/:comment_id/",middleware.checkCommentOwnership, function(req, res){
    // find and remove the specific comment
    Comment.findByIdAndRemove(req.params.comment_id,  function(err){
        if(err){
            console.log("CANT DELETE...THERES A PROBLEM", err)
            res.redirect("back")
        } else{ req.flash("success", "Comment deleted" )
            res.redirect ("/campground/" +  req.params.id)
        }
      });
    });

module.exports = router