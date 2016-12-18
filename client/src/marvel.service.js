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
          console.log(response.data);
          return response.data.results;
        }
      );
    }

  }

})();
