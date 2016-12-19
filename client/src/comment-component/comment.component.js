(function() {
  'use strict';
  angular.module('marvel')
    .component('commentTile',{
      templateUrl:'src/comment-component/comment.template.html',
      controller:CommentController,
      bindings:{
        comment:'<',
        index:'<',
        onRemove:'&'
      }
    });

    function CommentController() {
      var $ctrl = this;
      $ctrl.comment.updated = getReadableTime($ctrl.comment.updated);
    }
    //helper function
    function getReadableTime(timestamp) {
      var time = new Date(timestamp);
      var year = time.getFullYear();
      var month = time.getMonth()+1;
      var date1 = time.getDate();
      var hour = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      return year + "-" + month+"-"+date1+" "+hour+":"+minutes+":"+seconds;
    }
})();
