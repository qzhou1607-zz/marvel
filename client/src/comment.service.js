(function() {
  'use strict';
  angular.module('marvel')
    .service('CommentService',CommentService);

  CommentService.$inject = ['$http'];
  function CommentService($http) {
    var service = this;
    service.submitComment = function(characterId,comment) {
      return $http({
        method:'POST',
        data:{
          name:comment.name,
          message:comment.message
        },
        url:'/api/characters/comments/' + characterId
      }).then(function(response) {
        return response.data;
      },function(err) {
        console.log(err);
      });
    }

    service.getComments = function(characterId) {
      return $http({
        method:'GET',
        url:'/api/characters/comments/' + characterId
      }).then(function(response) {
        return response.data;
      }, function(err) {
        console.log(err);
      });
    }

    service.deleteComment = function(characterId,commentIdx) {
      return $http.delete('/api/characters/comments/' + characterId,
       { params: {'commentIdx':commentIdx} }).then(function(response) {
        return response.data;
      });
    }
  }

})();
