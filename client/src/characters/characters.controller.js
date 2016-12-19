(function() {
  'use strict';
  angular.module('marvel')
    .controller('CharactersController',CharactersController);

    CharactersController.$inject = ['MarvelService', 'characters', '$rootScope'];

    function CharactersController(MarvelService, characters, $rootScope) {
      var CharsCtrl = this;
      CharsCtrl.pageNumber = $rootScope.pageNumber;
      CharsCtrl.characters = characters;

      //fetch new page
      CharsCtrl.fetchNextPage = function() {
        MarvelService.getAllCharacters(CharsCtrl.pageNumber + 1)
          .then(function(response) {
            CharsCtrl.characters = response;
            CharsCtrl.pageNumber += 1;
            //$rootScope.pageNumber = CharsCtrl.pageNumber;
            $rootScope.$emit('page:turn', 'plusOne'); // $rootScope.$on
          });
      }

      //fetch previous page
      CharsCtrl.fetchPreviousPage = function() {
        MarvelService.getAllCharacters(CharsCtrl.pageNumber - 1)
          .then(function(response) {
            CharsCtrl.characters = response;
            CharsCtrl.pageNumber -= 1;
            //$rootScope.pageNumber = CharsCtrl.pageNumber;
            $rootScope.$emit('page:turn', 'minusOne');
          });
      }
    }
})();
