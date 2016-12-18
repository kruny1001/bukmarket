'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:quizOx
 * @description
 * # quizOx
 */
angular.module('starter')
  .directive('quizOx', function ($sce, $timeout, $q, $rootScope, $location, AudioService) {
    return {
      templateUrl: 'templates/directive/quiz-ox.html',
      scope: {
        stopAudio: '&',
        reset: '=',
        resource: '=',
        qiuzReady: '=',
        type:'='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var crnt_quiz = 0;
        scope.ready = true;
        scope.state = null;
        scope.API = null;
        scope.currentVideo = 0;
        scope.$watch('reset', function (value) {
          /*Checking if the given value is not undefined*/
          if(value){
            //scope.reset = false;
            scope.Obj = value;
            /*Injecting the Method*/
            scope.Obj.invoke = function(){
              scope.quizOn = false;
              if(scope.type === 'handon'){
                if($rootScope.lang === "cn")
                  scope.title = "Handon OX 知识竞赛"
                else if($rootScope.lang === "kr")
                  scope.title = "한돈 OX 퀴즈"
                else if($rootScope.lang === "en")
                  scope.title = "Handon True / False Quiz"
                else if($rootScope.lang === "jp")
                  scope.title = "Handon O/X クイズ"
              }
              else if(scope.type === 'dosegi'){
                if($rootScope.lang === "cn")
                  scope.title = "do sae gi OX 知识竞赛"
                else if($rootScope.lang === "kr")
                  scope.title = "도새기 OX 퀴즈"
                else if($rootScope.lang === "en")
                  scope.title = "Do-Sae-Gi True / False Quiz"
                else if($rootScope.lang === "jp")
                  scope.title = "Do-Sae-Gi O/X クイズ"
              }
              scope.resetQuiz();
            }
          }
        });

        $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams, options){
            if($rootScope.lang === "cn")
              scope.title = "do sae gi OX 知识竞赛"
            else if($rootScope.lang === "kr")
              scope.title = "도새기 OX 퀴즈"
            crnt_quiz = 0;
            scope.currentVideo = 0;
            if(scope.API)
              scope.API.stop();
            var crnt_quiz = 0;
            scope.currentVideo = 0;
            scope.quizReady = true;
            //scope.quizOn = false;
            scope.answerOn = false;
            scope.quizEnd = false;
            var tl = new TimelineLite();
            tl.to('.slideShow__container', .9, {xPercent:'0', ease: Power2.easeOut})
            console.log(scope.type);
          })

        scope.resetQuiz = function(){
          if($rootScope.lang === "cn")
            scope.title = "do sae gi OX 知识竞赛"
          else if($rootScope.lang === "kr")
            scope.title = "도새기 OX 퀴즈"
          crnt_quiz = 0;
          scope.currentVideo = 0;
          if(scope.API)
            scope.API.stop();
          var crnt_quiz = 0;
          scope.currentVideo = 0;
          scope.quizReady = true;
          //scope.quizOn = false;
          scope.answerOn = false;
          scope.quizEnd = false;
          var tl = new TimelineLite();
          tl.to('.slideShow__container', .9, {xPercent:'0', ease: Power2.easeOut})
          console.log(scope.type);
        }



        //Set Videogular
        scope.audios = scope.resource.audio;
        scope.ready = scope.quizReady;
        scope.config = {
          preload: "none",
          sources: scope.audios[0].sources,
        };

        scope.onPlayerReady = function(API) {
          scope.API = API;
        };

        scope.onCompleteVideo = function() {
          scope.isCompleted = true;
          if(scope.currentVideo === 0){
            scope.currentVideo++;
            if (scope.currentVideo >= scope.audios.length) scope.currentVideo = 0;
            scope.setVideo(scope.currentVideo);
          } else {
            if(scope.audios[scope.currentVideo].name === 'q')
            {scope.quizOn = true;}
            else if(scope.audios[scope.currentVideo].name === 'a')
            {scope.quizOn = false;}
          }
        };

        scope.setVideo = function(index) {
          scope.API.stop();
          scope.currentVideo = index;
          scope.config.sources = scope.audios[index].sources;
          $timeout(scope.API.play.bind(scope.API), 100);
        };


        scope.answerOn = false;
        scope.quizReady = true;
        scope.quizOn = false;





        var crnt_quiz = 0;
        scope.currentVideo = 0;
        scope.quizReady = true;
        scope.quizEnd = false;
        var tl = new TimelineLite();
        tl.to('.slideShow__container', .9, {xPercent:'0', ease: Power2.easeOut})

        scope.quiz_start = function(){


          if(scope.type==='handon')
            scope.resource = AudioService.handonQuiz($rootScope.lang);
          else if(scope.type === 'dosegi')
            scope.resource = AudioService.dosegiQuiz($rootScope.lang);

          scope.quizs = scope.resource.quiz;
          scope.answers = scope.resource.answer;
          scope.audios = scope.resource.audio;
          scope.config = {
            preload: "none",
            sources: scope.audios[0].sources,
          };
          scope.stopAudio();
          crnt_quiz = 0;
          scope.currentVideo = 0;
          var quizAudioDeferred = $q.defer();
          var promise = quizAudioDeferred.promise;
          promise.then(function(){
          })
          scope.quizReady = false;
          scope.setVideo(0);
          scope.quizEnd = false;
          var tl = new TimelineLite();
          tl.to('.slideShow__container', .9, {xPercent:'0', ease: Power2.easeOut})
        }

        scope.targetAnswer = "정답입니다. ";
        scope.isCorrect = false;


        scope.nextSlide = function(){
          stopAutoPlay();
          if (!isAnimating) {
            if(limit !== crnt_Index){
              var tl = new TimelineLite();
              tl.to('.slideShow__container', .9, {xPercent:'-=100', ease: Power2.easeOut})
              crnt_Index++;
            } else{
              alert("End")
            }
          }
        }

        var isAnimating = false;
        var isAutoPlay = false;

        function play(){
          scope.nextSlide();
          TweenLite.delayedCall(4, play);
        }
        function stopAutoPlay() {
          isAutoPlay = false;
          TweenLite.killDelayedCallsTo(play);
        }
        var crnt_Index = 1;
        scope.nextSlide = function(){
          stopAutoPlay();
          if (!isAnimating) {
            var tl = new TimelineLite();
            tl.to('.slideShow__container', .9, {xPercent:'-=100', ease: Power2.easeOut})
            crnt_Index++;
          }

        }
        scope.prevSlide = function(){
          stopAutoPlay();
          if (!isAnimating) {
            var tl = new TimelineLite();
            tl.to('.slideShow__container', .9, {xPercent:'+=100', ease: Power2.easeOut})
            crnt_Index--;
          }
        }

        scope.answer = function(ans) {
          scope.targetAnswerDesc = scope.answers[crnt_quiz].desc;
          scope.targetAnswer = scope.answers[crnt_quiz].answer;
          scope.answerOn = true;
          scope.quizOn = false;
          scope.currentVideo++;
          crnt_quiz++;
          scope.setVideo(scope.currentVideo);
        }

        scope.next = function(){
          if(crnt_quiz < scope.quizs.length ) {
            scope.answerOn = false;
            scope.quizOn = true;
            scope.nextSlide();
            scope.currentVideo++;
            scope.setVideo(scope.currentVideo);
            scope.quizOn = false;
          }
          else {
            //END Quiz
            scope.quizEnd = true;
            scope.answerOn = false;
            scope.API.stop();
          }
        }
        scope.resetQuiz();
      }
    };
  });
