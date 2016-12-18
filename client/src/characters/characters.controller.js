(function() {
  'use strict';
  angular.module('marvel')
    .controller('CharactersController',CharactersController);

    CharactersController.$inject = ['MarvelService', 'characters'];

    function CharactersController(MarvelService, characters) {
      var CharsCtrl = this;
      CharsCtrl.page = 0;
      console.log(characters);
      CharsCtrl.characters = characters;

      //fetch new page
      CharsCtrl.fetchNextPage = function() {
        MarvelService.getAllCharacters(CharsCtrl.page + 1)
          .then(function(response) {
            CharsCtrl.characters = response;
            CharsCtrl.page += 1;
          });
      }

      //fetch previous page
      CharsCtrl.fetchPreviousPage = function() {
        MarvelService.getAllCharacters(CharsCtrl.page - 1)
          .then(function(response) {
            CharsCtrl.characters = response;
            CharsCtrl.page -= 1;
          });
      }
    }
})();
