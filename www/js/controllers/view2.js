'use strict';

/**
 * @ngdoc function
 * @name starter.controller:View2Ctrl
 * @description
 * # View2Ctrl
 * Controller of the starter
 */
angular.module('starter')
  .controller('View2Ctrl', function ($scope, $timeout, $rootScope) {

    $rootScope.tapMenu = true;

    $scope.$on("$ionicView.beforeEnter", function(event, data){
      TweenLite.set('.bottomImg',{display:'none'})
    })

  });
