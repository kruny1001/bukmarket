'use strict';

/**
 * @ngdoc function
 * @name starter.controller:View21Ctrl
 * @description
 * # HandonCtrl
 * Controller of the starter
 */
angular.module('starter')
  .controller('MarketCtrl', function ($scope, $sce, $state,  $timeout, $rootScope, AudioService, $compile) {
    $scope.$on('reset-submenu', function(event, args) {
      TweenLite.set(".cnt",  {y:0})
      $scope.setMenu()
    });

    //BeforeEnter
    $scope.$on("$ionicView.beforeEnter", function(event, data){
      //$scope.resource = AudioService.handonQuiz($rootScope.lang);
      //$scope.config = AudioService.handonResource($rootScope.lang);
      TweenLite.set(".cnt",  {y:0})
      $scope.setMenu()
    });

    //AfterEnter
    $scope.$on("$ionicView.afterEnter", function(event, data){
      TweenLite.to(".cnt", 1, {y: function(index, target) {
          return (index + 1) * 5 // 100, 200, 300
        }
      })
      $scope.selectedMenu = false;
      //$timeout(function() {$scope.API.play()}, 1000);
      if($rootScope.AudioAPIRoot !==null){
        $timeout(function(){
          console.log($rootScope.AudioAPIRoot);
          $rootScope.AudioAPIRoot.play()
        }, 100);
      }
    })

    //BeforeLeave
    $scope.$on("$ionicView.beforeLeave", function(event, data){
      if($rootScope.AudioAPIRoot.currentState !== undefined && $rootScope.AudioAPIRoot.currentState !=='stop')
        $rootScope.AudioAPIRoot.stop();
      //Root Level Audio Setting
      console.log($rootScope.AudioAPIRoot)
      if($rootScope.AudioAPIRoot !==null)
        $rootScope.AudioAPIRoot.pause();
    });
    $scope.detailOn = false;
    //Menu List
    $scope.menus = [
      {
        type: 'detail',
        title: '찾아오시는길',
        desc: '시장으로 찾아 오시는길',
        style: {background:'#53c6cd'},
        backImg: 'img/mainMenu/map.svg'
      },
      {
        type: 'detail',
        title: '민속시장 먹거리',
        desc: '민속시장 각종 먹거리 정보',
        style:{background:'#ca86cd'},
        backImg: 'img/mainMenu/place.svg'
      },
      {
        type: 'detail',
        title: '민속시장 전통주막',
        desc: '민속시장 전통주막 정보',
        style:{background:'#4caf50;'},
        backImg: 'img/mainMenu/ju.svg'
      },
      {
        type: 'detail',
        title: '관광코스',
        desc: '동시에 즐길수 있는 관광정보',
        style:{background:'#4caf50'},
        backImg: 'img/mainMenu/sightsees.svg'
      },
    ];

    var audio = new Audio('sounds/click.mp3');
    $scope.injectedObject = {};
    $rootScope.tapMenu = true;
    $scope.quizReady = false;

    /*
    //Stop Play
    $scope.stopPlay = function(){
      $scope.API.stop();
    }
    //When audio is ready, Play it
    $scope.onPlayerReady = function(API){
      $scope.API = API;
      $timeout(function() {$scope.API.play()}, 1000);
    }
    */
    $scope.selectMenu = function(target){
      $scope.selectedMenu = true;
      showDetialPage(target)
      var tl = new TimelineMax();
      if(target=== 3){
        tl.to('#dropTitle', .4, {color:'red', fontWeight:'bold', scale:'2', trandformOrigin: '50% 50%' })
        .to('#dropTitle', .5, {color:'black', fontWeight:'bold', scale:'1', trandformOrigin: '50% 50%' })
      }
      audio.play()
      TweenMax.staggerTo('.cnt', 1.2, {y:-1300, ease:Elastic.easeOut});
      TweenMax.to('.back', 1.2, {alpha: true});
      TweenMax.set('.wrapper', {display:'none'});
        TweenLite.set('.bottomImg',{display:'none'})
        if($scope.API){
          //$timeout(function(){$scope.API.play()}, 1000);
          $scope.quizReady = false;
        }
        $scope.detailOn = true;
    }

    $scope.setMenu = function(){
      $scope.selectedMenu = false;
      showDetialPage('none')
      audio.play() // Naration should be set
      animation();
      // if($scope.API !== undefined && $scope.API.currentState !=='stop')
      //   $scope.API.stop();
      $scope.detailOn = false
      $scope.quizOn = false;
      $scope.galleryOn = false;
      //$scope.injectedObject.invoke(); //Quiz Reset
    }

    function animation() {
      TweenMax.set('.wrapper', {display:'block'});
      TweenMax.set('.bottomImg', {display:'block'});
      TweenMax.set('.bottomImg',{y:0})
      TweenMax.from('.bottomImg',0.7,{y:200, display:'block'})
      TweenMax.staggerTo('.cnt', 1.2, {y:0, ease:Elastic.easeOut});
    }

    function showDetialPage(target){
      $scope.detailPages.forEach(function(val, index){
        if(index == target)
          val.show = true;
        else
          val.show = false;
      })
    }
    //Should be fixed The content is not used
    $scope.detailPages = [
      {
        show:false,
        cnt:[
          {
            html: ''
          }
        ]
      },
      {
        show:false,
        cnt:[
          {}
        ]
      },
      {
        show:false,
        cnt:[
          {}
        ]
      },
      {
        show:false,
        cnt:[
          {}
        ]
      }

    ];

  });
