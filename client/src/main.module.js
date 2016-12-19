(function() {
  'use strict';
  var app = angular.module('marvel',['ui.router','ngSanitize','loader'])
    .constant('ApiPath','/api');

    app.run(['$rootScope',function($rootScope) {
      $rootScope.pageNumber = 0;
      $rootScope.$on('page:turn', function (event, data) {
        if(data === 'plusOne') {
          $rootScope.pageNumber += 1;
        } else {
          $rootScope.pageNumber -= 1;
        }
      });
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    }]);
})();
