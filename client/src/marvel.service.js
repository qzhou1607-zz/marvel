(function() {
  'use strict';
  angular.module('marvel')
    .service('MarvelService',MarvelService);

  MarvelService.$inject = ['$http'];
  function MarvelService($http) {
    var service = this;
    service.getAllCharacters = function(page) {
      return $http.get('/api/characters/' + page).then(
        function(response) {
          return response.data.results;
        }
      );
    }

    service.getCharacterDetails = function(characterId) {
      return $http.get('/api/characters/details/' + characterId).then(
        function(response) {
          return response.data.results;
        }
      );
    }

  }

})();
