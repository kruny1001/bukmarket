'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:gallery
 * @description
 * # gallery
 */
angular.module('starter')
  .directive('gallery', function ($mdDialog) {
    return {
      templateUrl: 'templates/directive/gallery.html',
      restrict: 'E',
      scope:{
        src :'='
      },
      link: function postLink(scope, element, attrs) {
        scope.showAdvanced = function(ev, index){
          $mdDialog.show({
            controller: DialogCtrl,
            locals : {
              targetSrc : scope.src[index]
            },
            templateUrl: 'templates/dialogs/image.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            //fullscreen: useFullScreen
          })
        }

        function DialogCtrl($scope, $mdDialog, targetSrc) {
          $scope.targetSrc = targetSrc;
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
        }
      }
    };
  });