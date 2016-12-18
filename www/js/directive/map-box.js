'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:mapBox
 * @description
 * # mapBox
 */
angular.module('starter')
  .directive('mapBox', function (NgMap, RestaurantService, $timeout, $rootScope) {
    return {
      templateUrl: 'templates/directive/map-box.html',
      restrict: 'E',
      link:{
        pre: function(scope, element, attrs) {

          scope.rests = RestaurantService.getRestaurant();
          scope.rests = _.sortBy(scope.rests, function(o){return o.verified === false})
          //console.log(_.sortBy(scope.rests, function(o){return o.verified === false}))
          //console.log(scope.rests);
          if($rootScope.lang == 'kr'){
            scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPX2fyx9Y3-fFYyELyfnKf7zh1L_ZncIA&callback=initMap&language=en&region=KR";
          }
          else if($rootScope.lang == 'cn'){
            scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPX2fyx9Y3-fFYyELyfnKf7zh1L_ZncIA&callback=initMap&language=zh-CN&region=KR";
          }
          else if($rootScope.lang == 'en'){
            scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPX2fyx9Y3-fFYyELyfnKf7zh1L_ZncIA&callback=initMap&language=en&region=KR";

          }
          else if($rootScope.lang == 'jp'){
            scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPX2fyx9Y3-fFYyELyfnKf7zh1L_ZncIA&callback=initMap&language=ja&region=KR";
          }
        },
        post:function postLink(scope, element, attrs) {
          scope.targetPicIndex = 0;
          scope.selectImg = function(index){
            scope.targetPicIndex = index;
            scope.crntImg ={
              backgroundImage: 'url('+scope.targetRestaurant.pics[scope.targetPicIndex]+')',
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }
          }
          scope.setIndex = function(index){
            scope.zoomIn(index);
          }
          scope.zoomIn = function(index){
            var targetMarker = scope.mymap.customMarkers[index];
            scope.targetRestaurant = scope.rests[index];
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(targetMarker.getPosition());
            scope.mymap.fitBounds(bounds);
            scope.mymap.setZoom(15);
          }

          scope.selectRest = function(index){
            scope.targetPicIndex = 0;
            scope.mymap.setCenter(new google.map.LatLng(scope.rests[index].pos[0], scope.rests[index].pos[1]));
          }

          scope.$on('mapInitialized', function(evt,map) {
            scope.mymap = map;
            scope.$apply();
          });

          scope.addMarker = function(event) {
            var ll = event.latLng;
            scope.positions.push({pos:[ll.lat(), ll.lng()]});
          }


          NgMap.getMap().then(function(map) {
          });


          scope.targetRestaurant = scope.rests[0]
          scope.crntImg ={
            backgroundImage: 'url('+scope.targetRestaurant.pics[scope.targetPicIndex]+')',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }
          scope.click = function() {
            for(var key in scope.mymap.customMarkers){
              TweenMax.set(scope.mymap.customMarkers[key].el, {scale:1})
            }
            TweenMax.to(this, 0.4, {scale:0.6, ease:Bounce.easeOut})
          };

          scope.fly=function(index){

            //reset Marker
            for(var key in scope.mymap.customMarkers){
              TweenMax.set(scope.mymap.customMarkers[key].el, {scale:1})
            }
            scope.targetPicIndex = 0;
            scope.targetRestaurant = scope.rests[index];
            scope.crntImg ={
              backgroundImage: 'url('+scope.targetRestaurant.pics[scope.targetPicIndex]+')',
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }
            scope.mymap.setCenter(new google.maps.LatLng(scope.rests[index].pos[0], scope.rests[index].pos[1]));
            scope.mymap.setZoom(13);
            var targetMarker = scope.mymap.customMarkers[index];
            var duration = 1;
            var tl = new TimelineMax({repeat:3})

            tl.to(targetMarker.el, 0.5, {
                transformOrigin: "50% 50%",
                y: -50,
                ease: Circ.easeOut
                //ease: Power1.easeInOut
              }, "bounce")

              /* ball bounce down */
              .to(targetMarker.el, 0.4, {
                transformOrigin: "50% 50%",
                y: 0,
                ease: Circ.easeIn
                //ease: Power1.easeInOut
              }, "bounce2")

              /* ball squash */
              .to(targetMarker.el, 0.15, {
                transformOrigin: "50% 100%",
                scaleX: 1.3,
                scaleY: 0.7,
                ease: Power1.easeInOut
                //ease: Bounce.easeOut
              }, "bounce3-=0.04")
              .progress(1).progress(0).set(targetMarker.el, {scale:1}) //, "bounce"

            //tl.from(targetMarker.el, duration / 2, {y:-10, ease:Bounce.easeOut, delay:duration / 2});
          }
        }
      }
    };
  });