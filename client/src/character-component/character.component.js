(function() {
  'use strict';
  angular.module('marvel')
    .component('characterTile',{
      templateUrl:'src/character-component/character.template.html',
      bindings:{
        character:'<'
      }
    });
})();
