(function() {
  'use strict';

  angular.module('marvel')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function routeConfig ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('characters', {
        url:'/',
        templateUrl:'src/characters/characters.html',
        controller:'CharactersController as CharsCtrl',
        resolve:{
          characters:['MarvelService',function(MarvelService) {
            return MarvelService.getAllCharacters(0);
          }]
        }
      });
  }
})();
