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

      //fetch new pages
      CharsCtrl.fetchNextPage = function() {
        CharsCtrl.page += 1;
        MarvelService.getAllCharacters(CharsCtrl.page)
          .then(function(response) {
            CharsCtrl.characters = response;
          });
      }
    }
})();
