'use strict';
var client = require('./redis.js');
var Comment = require('../models/comment.js')

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
                res.json(result);
        });
  }

  //find all comments for the same character
  this.getComments = function(req,res) {
    var targetId = req.params.id;
    Comment.find({ characterId: targetId })
            .exec(function(err,result) {
              if(err) {throw new Error(err)}
              res.json(result);
            })
  }

  //delete a comment
  this.deleteComment = function(req,res) {
    var _id = req.body._id; //unique object id for this comment
    Comment.findOneAndRemove({ '_id':_id })
            .exec(function(err,result) {
              if(err) { throw new Error(err) }
              res.json(result);
            });
  }

  //update a comment
  this.updateComment = function(req,res) {
    var _id = req.body._id;
    var newMessage = req.body.message;
    var options = { new: true }
    Comment.findOneAndUpdate({'_id':_id }, { message: newMessage }, options)
            .exec(function(err,result) {
              if(err) { throw new Error(err) }
              res.json(result);
            });
  }
}

module.exports = commentHandler;
