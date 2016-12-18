'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:brandLogo
 * @description
 * # card-box
 북평마켓
 */
angular.module('starter')
  .directive('cardBox', function () {
    return {
      templateUrl: 'templates/directive/card-box.html',
      restrict: 'E',
      scope:{ info:'=' },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
