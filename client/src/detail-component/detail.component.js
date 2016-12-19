(function() {
  'use strict';
  angular.module('marvel')
    .component('detailTile',{
      templateUrl:'src/detail-component/detail.template.html',
      bindings:{
        detail:'<'
      }
    });
})();
