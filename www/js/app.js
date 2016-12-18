// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material',
    //'webcam',
    'ngSanitize','ngMaterial',
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "com.2fdevs.videogular.plugins.buffering",
    "info.vietnamcode.nampnq.videogular.plugins.youtube",
    'ngMap',
    'firebase',
    'ja.qr'
]);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            //StatusBar.styleDefault();
            StatusBar.hide();
            ionic.Platform.fullScreen();
        }
    });
})
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.cam', {
          url: '/cam',
          cache: true,
          views: {
              'menuContent': {
                  templateUrl: 'templates/regular/cam.html',
                  controller: 'CamCtrl'
              }
          }
      })
      .state('app.sight', {
          url: '/sight',
          cache: true,
          views: {
              'menuContent': {
                  templateUrl: 'templates/regular/sight.html',
                  controller: 'SightCtrl'
              }
          }
      })
      .state('app.market', {
          url: '/market',
          cache: true,
          views: {
              'menuContent': {
                  templateUrl: 'templates/regular/market.html',
                  controller: 'MarketCtrl'
              }
          }
      })
      .state('app.view1', {
          url: '/view1',
          cache: true,
          views: {
              'menuContent': {
                  templateUrl: 'templates/regular/view1.html',
                  controller: 'View1Ctrl'
              }
          }
      })
      .state('app.view2', {
          url: '/view2',
          views: {
              'menuContent': {
                  templateUrl: 'templates/regular/view2.html',
                  controller: 'View2Ctrl'
              }
          }
      })
      .state('app.admin', {
          url: '/admin',
          views: {
              'menuContent': {
                  templateUrl: 'templates/regular/admin.html',
                  controller: 'AdminCtrl'
              }
          }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/view1');
})
  .config(function($mdIconProvider) {
      var config = {
          apiKey: "AIzaSyAPX2fyx9Y3-fFYyELyfnKf7zh1L_ZncIA",
          authDomain: "handon-f7065.firebaseapp.com",
          databaseURL: "https://handon-f7065.firebaseio.com",
          storageBucket: "handon-f7065.appspot.com",
      };
      firebase.initializeApp(config);

      // Configure URLs for icons specified by [set:]id.
      $mdIconProvider
        .icon('logo', 'img/logo.svg')  // Register icon in a specific set
        .icon('kr', 'img/flags/kr.svg')
        .icon('us', 'img/flags/us.svg')
        .icon('jp', 'img/flags/jp.svg')
        .icon('cn', 'img/flags/cn.svg')
  })
  //Home Video
  .run(function($rootScope, $timeout, $sce){
      $rootScope.lang = 'kr';
      $rootScope.stateRoot = null;
      $rootScope.APIRoot = null;
      $rootScope.currentVideoRoot = Math.floor((Math.random() * 10));
      $rootScope.onPlayerReadyVideoRoot = function(API){
        $rootScope.APIRoot = API;
        //$timeout(function(){$rootScope.APIRoot.play()}, 2000);
      }
      $rootScope.onCompleteVideoRoot = function() {
          $rootScope.isCompletedRoot = true;
          $rootScope.currentVideoRoot++;
          if ($rootScope.currentVideoRoot >= $rootScope.videos.length) $rootScope.currentVideoRoot = 0;
          $rootScope.setVideoRoot($rootScope.currentVideoRoot);
      };
      $rootScope.videos =
      [
  			//{sources: [{src: "https://www.youtube.com/watch?v=6nKawY809ew"}]},
  			{sources: [{src: "https://www.youtube.com/watch?v=Mo_SFvD7Z80"}]},
      ]
      // [
      //     {sources: [{src: "https://www.youtube.com/watch?v=Mo_SFvD7Z80"}]},
      //     {sources:[{src: $sce.trustAsResourceUrl("http://res.cloudinary.com/dbfirebase/video/upload/v1481878459/bukMarket/logosong.mp3"), type: "audio/mpeg"}]},
      // ];
      $rootScope.setVideoRoot = function(index) {
          console.log(index);
          $rootScope.APIRoot.stop();
          $rootScope.currentVideoRoot = index;
          $rootScope.configVideo.sources = $rootScope.videos[index].sources;
          $timeout($rootScope.APIRoot.play.bind($rootScope.APIRoot), 100);
      };
      $rootScope.configVideo = {
          preload: "none",
          sources: $rootScope.videos[0].sources,
          theme: "lib/videogular-themes-default/videogular.css",
      };
  })
  //Home Audio
  // .run(function($rootScope, $timeout){
  //     $rootScope.audioStateRoot = null;
  //     $rootScope.AudioAPIRoot = null;
  //     $rootScope.currentAudioRoot = Math.floor((Math.random() * 10));
  //     $rootScope.onPlayerReadyAudioRoot = function(API){
  //       $rootScope.APIRoot = API;
  //       $timeout(function(){$rootScope.APIRoot.play()}, 2000);
  //     }
  //     $rootScope.onCompleteAudioRoot = function() {
  //         $rootScope.isCompletedRoot = true;
  //         $rootScope.currentVideoRoot++;
  //         if ($rootScope.currentVideoRoot >= $rootScope.videos.length) $rootScope.currentVideoRoot = 0;
  //         $rootScope.setVideoRoot($rootScope.currentVideoRoot);
  //     };
  //     $rootScope.videos = [ {sources:[{src: 'https://www.youtube.com/watch?v=Mo_SFvD7Z80'}]}, ];
  //     $rootScope.setAudioRoot = function(index) {
  //         $rootScope.APIRoot.stop();
  //         $rootScope.currentVideoRoot = index;
  //         $rootScope.configVideo.sources = $rootScope.videos[index].sources;
  //         $timeout($rootScope.APIRoot.play.bind($rootScope.APIRoot), 100);
  //     };
  //     $rootScope.configAudio = {
  //         preload: "none",
  //         sources: $rootScope.videos[0].sources,
  //         theme: "lib/videogular-themes-default/videogular.css",
  //     };
  // });
