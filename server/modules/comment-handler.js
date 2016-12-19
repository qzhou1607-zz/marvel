'use strict';
var client = require('./redis.js');
var Comment = require('../models/comment.js');
var q = require('q');

function commentHandler() {
  //add a new comment
  this.addComment = function(req,res) {
    var newId = req.params.id; //character id
    var newName = req.body.name;
    var newMessage = req.body.message;

    // var update = {
    //   $push:{
    //     entry:{
    //       name:newName,
    //       message:newMessage
    //     }
    //   },
    //   $set:{
    //     updated: new Date(),
    //   }
    //  };
    var newComment = new Comment();
    newComment.characterId = newId;
    newComment.name = newName;
    newComment.message = newMessage;
    newComment.updated = new Date();
    // var newComment  = {
    //   characterId:newId,
    //   name:newName,
    //   message:newMessage,
    //   updated:new Date()
    // }

    var options = {
       new:true
     }

    newComment
        .save(function(err,result) {
                if (err) { throw new Error(err) }
                //update cache
                reloadComments(newId) //reload comments from database
                  .then(function(response) {
                    client.setex(newId+'-comments',60, JSON.stringify(response));
                    res.json({'success':'new comment was saved!', 'data':result});
                  });
        });
  }

  //find all comments for the same character
  this.getComments = function(req,res) {
    var targetId = req.params.id;
    client.get(targetId+'-comments', function(err,comments) {
      if(comments) { //if comments are cached
        res.json(JSON.parse(comments));
      } else {  // if comments are not cached or expired
        reloadComments(targetId) //reload comments from database
          .then(function(response) {
            client.setex(targetId+'-comments',30, JSON.stringify(response));
            res.json(response);
          });
      }
    })
  }

  //delete a comment
  this.deleteComment = function(req,res) {
    var _id = req.query.commentIdx; //unique object id for this comment
    console.log(_id);
    Comment.findOneAndRemove({ '_id':_id })
            .exec(function(err,result) {
              if(err) { throw new Error(err) }
              //update cache
              var targetId = result.characterId;
              reloadComments(targetId) //reload comments from database
                .then(function(response) {
                  client.setex(targetId+'-comments',60, JSON.stringify(response));
                  res.json({'success':'comment was deleted!', 'data':response});
                });
            });
  }

  //update a comment
  // this.updateComment = function(req,res) {
  //   var _id = req.body._id;
  //   var newMessage = req.body.message;
  //   var options = { new: true }
  //   Comment.findOneAndUpdate({'_id':_id }, { message: newMessage }, options)
  //           .exec(function(err,result) {
  //             if(err) { throw new Error(err) }
  //             //update cache
  //             var targetId = result.characterId;
  //             reloadComments(targetId) //reload comments from database
  //               .then(function(response) {
  //                 client.setex(targetId+'-comments',60, JSON.stringify(response));
  //                 res.json({'success':'comment was updated!'});
  //               });
  //           });
  // }
}

//helper function, reload comments based on a given character id
function reloadComments(targetId) {
  var deferred = q.defer();
  Comment.find({ characterId: targetId }) //load comments from database
          .exec(function(err,result) {
            if(err) {
              deferred.reject(err);
            } else {
              deferred.resolve(result);
            }
          });
  return deferred.promise;
}

module.exports = commentHandler;
