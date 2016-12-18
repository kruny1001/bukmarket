'use strict';

/**
 * @ngdoc function
 * @name starter.controller:View1Ctrl
 * @description
 * # View1Ctrl
 * Controller of the starter
 */
angular.module('starter')
  .controller('View1Ctrl', function ($scope, $sce, $location, $timeout, $rootScope, $state) {
    $rootScope.tapMenu = false;
    $rootScope.tapMenu = false;
    var audio = new Audio('sounds/click.mp3');

    $scope.$watch('$viewContentLoaded', function(){});
    $scope.$on("$ionicView.afterEnter", function(event, data){
      TweenLite.set('.bottomImg',{display:'block'});
      $rootScope.tapMenu = false;
      // 비디오 플레이
      if($rootScope.APIRoot !==null){
        $rootScope.setVideoRoot(0);
        $timeout(function(){
          $rootScope.APIRoot.play()
        }, 100);
      }
    });
    $scope.$on("$ionicView.beforeLeave", function(event, data){
      if($rootScope.APIRoot !==null)
        //$rootScope.APIRoot.pause();
      $rootScope.tapMenu = true;
    });
    $scope.goTo = function(name){
      audio.play();
      $state.go(name)
    }
  });
