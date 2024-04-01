var mongoose        = require("mongoose")
var Campground      = require("./models/campground")
var Comment         = require("./models/comment")


var data = [
    {
        name: "trenches",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr0WyOE8iu19_J8q9sJTm-s6gHMn2lB0oOXA&usqp=CAU",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum nostrum dignissimos perspiciatis distinctio, accusantium dolorum eum mollitia molestias alias ratione minima quod! Sunt ratione quae magni, maiores maxime natus ut!"
    },
    {
    name: "face off",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPweDVDigCdtS7fAm89YHtPPQ8IUEKy075RQ&usqp=CAU",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum nostrum dignissimos perspiciatis distinctio, accusantium dolorum eum mollitia molestias alias ratione minima quod! Sunt ratione quae magni, maiores maxime natus ut!"
},
{
name: "chill",
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzy1kKc8QPe72zd-P8asivtf20QyCl1TnStw&usqp=CAU",
description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum nostrum dignissimos perspiciatis distinctio, accusantium dolorum eum mollitia molestias alias ratione minima quod! Sunt ratione quae magni, maiores maxime natus ut!"
}
]

function seedDB(){
    // Remove all campground
    Campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed campgrounds!");
    //         // add a few campgrounds
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("added a campground");
    //             // creat a comment
    //             Comment.create(
    //                 {
    //                    text:"Nice place but i wish there was internet",
    //                    author:"Humor"
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log("ERROR CREATING COMMENT")
    //                         console.log(err)
    //                     } else {
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("created new comment")
    //                     }
    //                 })
    //         }
    //     })
    //   })
    });

}
 
module.exports = seedDB;