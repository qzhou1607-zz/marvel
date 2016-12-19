(function() {
  'use strict';

  angular.module('marvel')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function routeConfig ($stateProvider,$urlRouterProvider) {
    //counter for character page number
    //var pageNumber = 0;
    // $rootScope.$on('page:turn', function (event, data) {
    //   if(data === 'plusOne') {
    //     pageNumber += 1;
    //   } else {
    //     pageNumber -= 1;
    //   }
    // });
    //routing
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('characters', {
        url:'/',
        templateUrl:'src/characters/characters.html',
        controller:'CharactersController as CharsCtrl',
        resolve:{
          characters:['MarvelService','$rootScope',function(MarvelService, $rootScope) {
            return MarvelService.getAllCharacters($rootScope.pageNumber);
          }]
        }
      })
      .state('character-details', {
        url:'/details/{id}',
        templateUrl:'src/details/details.html',
        controller:'DetailsController as DetailsCtrl',
        resolve:{
          characterId:['$stateParams', function($stateParams) {
            return $stateParams.id;
          }],
          details:['MarvelService','$stateParams',function(MarvelService, $stateParams) {
            return MarvelService.getCharacterDetails($stateParams.id);
          }],
          comments:['CommentService', '$stateParams', function(CommentService, $stateParams) {
            return CommentService.getComments($stateParams.id);
          }]
        }
      });
  }
})();
