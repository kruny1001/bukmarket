'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:menuBar
 * @description
 * # menuBar
 */
angular.module('starter')
  .directive('menuBar', function () {
    return {
      templateUrl: 'templates/directive/menu-bar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });