'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:weather
 * @description
 * # weather
 */
angular.module('starter')
  .directive('weather', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the weather directive');
      }
    };
  });