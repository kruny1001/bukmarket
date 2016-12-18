'use strict';
/**
 * @ngdoc directive
 * @name starter.directive:photoBooth
 * @description
 * # photoBooth
 */
angular.module('starter')
  .directive('photoBooth', function () {
    return {
      templateUrl: 'templates/directive/photo-booth.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.myChannel = {
          // the fields below are all optional
          videoHeight: 250,
          videoWidth: 500,
          video: null // Will reference the video element on success
        };
        scope.capture = function(){
          alert("capture");
          captureImage();
        }
        var video, $output;
        var scale = 1;
        var initialize = function() {
          $output = $("#output");
          video = $("video").get(0);
          $("#capture").click(captureImage);
        };
        var captureImage = function() {
          var canvas = document.createElement("canvas");
          canvas.width = video.videoWidth * scale;
          canvas.height = video.videoHeight * scale;
          canvas.getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          var img = document.createElement("img");
          img.src = canvas.toDataURL();
          $output.prepend(img);
        };
        $(initialize);
      }
    };
  });
