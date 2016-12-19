(function() {
  'use strict';
  angular.module('marvel')
    .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['CommentService', 'details','characterId','comments'];

    function DetailsController(CommentService, details, characterId, comments) {
      var DetailsCtrl = this;
      DetailsCtrl.details = details;
      DetailsCtrl.characterId = characterId;
      DetailsCtrl.comments = comments;
      //submit a new comment
      DetailsCtrl.submitComment = function(commentForm) {
        var characterId = DetailsCtrl.characterId;
        var newComment = {
          name:DetailsCtrl.newComment.name,
          message:DetailsCtrl.newComment.message
        }
        //submit comment to database/cache
        CommentService.submitComment(characterId,newComment)
          .then(function success(response) {
            //if success, update view
            DetailsCtrl.comments.push(response.data);
            //clear form
            commentForm.$setUntouched();
            DetailsCtrl.newComment.name = '';
            DetailsCtrl.newComment.message = '';
            console.log('message was added!')
            //DetailsCtrl.complete = true;
          });
      }

      //Delete a comment
      DetailsCtrl.deleteComment = function(commentIdx) {
        var characterId = DetailsCtrl.characterId;
        //submit a delete request to database/cache
        CommentService.deleteComment(characterId, commentIdx)
          .then(function success() {
            //if success, update view
            DetailsCtrl.comments.forEach(function(comment, i) {
              if (comment._id === commentIdx) {
                comments.splice(i,1);
              }
            })
            console.log('message was deleted!')
          })
      }

    }
})();
