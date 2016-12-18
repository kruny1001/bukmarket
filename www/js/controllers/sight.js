/**
 * @ngdoc function
 * @name starter.controller:View11Ctrl
 * @description
 * # DosegiCtrl
 * Controller of the starter

 Menu 1
 소개
 */


'use strict';

angular.module('starter')
  .controller('SightCtrl', function ($scope, $sce, $timeout, $rootScope, AudioService) {


    $scope.infos = [
      {
        title: '촛대바위(능파대)',
        index: '제1경',
        img:'img/sightsees/1.jpg',
        desc:'애국가 첫 소절의 배경화면으로 유명한 이곳은 주변의 각종 기암괴석과 하늘을 찌를 듯이 높이 솟아있는 촛대바위가 보는 이로 하여금 감탄을 자아내게 하고 있으며 특히 아침 해돋이가 장관을 이루는 해상선경이다. 조선시대 강원도 제찰사로 있던 한명회가 이곳의 자연절경에 감탄하여 능파대(미인의 걸음걸이)라 부르기도 했던 곳으로 주변에는 고려 공민왕 10년(1361년)에 집현전 제학이었던 심동로가 관직에서 물러나 후학양성을 위해 건림한 지방문화재 해암정이 위치하고 있다.',
        address:'촛대바위길 28(추암동)',
        tel:'문화체육과(033-530-2441)'
      },
      {
        title: '용추폭포',
        index: '제2경',
        img:'img/sightsees/2.jpg',
        desc:'무릉계곡명승지에 있으며 낙수가 바위를 기묘하게 깎아 놓은 폭포로 용이 승천하는 듯한 모양을 지니고 있으며 상탕, 중탕은 옹기항아리 같은 형태를 하탕은 진옥색의 큰 용소를 이루고 있다. 높이가 100자도 넘게 곧게 내려쏟는 폭포의 옆에 서면 현기증이 날 정도이며, 금강산 구룡폭포에 비견되고 있다. 어느 묵객이 새겨놓은 별유천지(別有天地)라는 대형석각이 이곳의 자연경관을 대변해 주고 있으며, 부사 유한준이 용추(龍湫)라 이름 짓고 글을 썼다 한다.',
        address:'무릉로 538(삼화동)',
        tel:'무릉계곡명승지 관리사무소(033-539-3700~1)'
      },
      {
        title: '무릉반석',
        index: '제3경',
        img:'img/sightsees/3.jpg',
        desc:'무릉도원명승지입구에 자리 잡고 있는 이 반석은 석장암동(石場岩洞)이라고도 하며 1,500여 평이나 되는 하나의 흰돌로 펼쳐져 있는 것이 자연의 경이로움을 느끼게 하며 주변의 기암괴석과 함께 자연절경이 장관을 이룬다. 또한 암석에 수 놓여진 갖가지 기념각자의 석각이 이채롭기도 하다. 1571년에 4대 명필이요 사선의 일인자인 봉래 양사언이 반석상에 새긴 무릉선원(武陵仙源), 중대천선(中臺泉石), 두타동천(頭陀洞天)이란 12자와 하행방서로 옥호거사서 신미중춘(玉壺居士書辛未仲春)이란 초대형 석각이 있어 옛 선인들의 풍류를 엿볼 수 있다.',
        address:'무릉로 538(삼화동)',
        tel:'무릉계곡명승지 관리사무소(033-539-3700~1)'
      },
      {
        title: '망상명사십리(망상해수욕장)',
        index: '제4경',
        img:'img/sightsees/4.jpg',
        desc:'얕은 수심, 청정해수, 넓은 백사장과 울창한 송림 등 동해안 제1의 망상해변은 매년 600~700만 명의 피서객이 즐겨 찾는 곳으로 최신식 시설의 1등급 관광호텔, 망상오토캠핑리조트 등 숙박 및 각종 편의시설의 확충으로 사계절 관광지로 변모해 가고 있다. 4㎞의 넓은 백사장과 푸른 바다 위를 수없이 갈매기 떼가 넘나들고 있고, 옛날에는 해당화가 유명하였다고 한다. 인근에는 6.25당시 북한군과의 교전상황과 우리군의 업적을 기린 옥계지구 해군전적비가 자리하고 있다.',
        address:'동해대로 6270-10(망상동)',
        tel:'바다민원실(033-530-2799)'
      },
      {
        title: '천곡천연동굴',
        index: '제5경',
        img:'img/sightsees/5.jpg',
        desc:'1991년 6월 24일 처음 발견된 천곡천연동굴은 국내에서 유일하게 시내 중심지에 위치하고 있으며 높이 10m, 연장 1.4㎞ 규모의 천연 석회석 동굴로서 생성시기는 약 4~5억년 전으로 추정된다. 동굴내에서는 국내에서도 으뜸인 천정용식구, 석순과 석주 등이 광범위하게 분포하고 있고 아직까지 2차 생성물이 서식하고 있는 환상적인 지하궁전의 세계를 방불케 한다. 이 동굴은 학술적 가치는 물론 관광개발 가치면에서도 주목 받고 있으며 총연장 1.4㎞중 700m만 단계적으로 개발하여 개방하고 있으며 나머지 700m는 보존지구로 지정관리하고 있다.',
        address:'동굴1길 4-3(천곡동)',
        tel:'천곡천연동굴 자연학습관(033-539-3630~1)'
      },
      {
        title: '만경대',
        index: '제6경',
        img:'img/sightsees/6.jpg',
        desc:'척주8경의 하나였던 이 정자는 광해군 5년(1613년)에 김훈이 첨정(僉正)벼슬에서 사임하고 고향에 돌아와 창건한 정자로 서쪽으로는 동해시의 영적모산인 두타산, 동쪽으로는 동해항, 정자 아래로는 동해시의 젖줄인 전천이 굽이쳐 흘러 삼척의 죽서루와 쌍벽을 이루면서 시인 묵객들의 발길이 끊이지 않았다 한다. 현종 원년(1660년)에 삼척부사 허미수가 경관이 수려하여 만경이라 불렀고 그 후에 만경대로 바뀌었다. 판서 이남식의 해상명구 현판이 있고 정면에는 향토명필 옥람 한일동의 만경대 액판이 있다.',
        address:'구미동 산 53',
        tel:'동해시청(033-530-2114)'
      },
      {
        title: '호해정, 할미바위',
        index: '제7경',
        img:'img/sightsees/7.jpg',
        desc:'1945년 조국의 광복을 기념하기 위하여 일헌 최덕규 등 40명의 주춘계원이 창건한 호해정에는 명필 김정희, 홍낙섭의 현액이 있다. 앞으로는 전천강이 갯목과 함께 운치를 이루고 있으며 뒤로는 동해바다와 맞닿은 해안을 따라 기암괴석이 펼쳐져 있다. 또한 바닷물이 출렁거리는 해아절벽 위에는 직경 2.5m의 흔들바위가 올라앉아 율동을 하고 있는데 이 바위를 할미바위라 한다. 심술궂은 마귀할미가 바닷속으로 굴러 떨어뜨린 바위를 마을사람들이 제사를 지내고 다시 올려놓았더니 용왕님이 벼락을 내려 그 마귀할미를 벌하였다하여 할미바위라 이름 지어졌다.',
        address:'북평동 5통 일대',
        tel:'문화체육과(033-530-2441)'
      },
      {
        title: '초록봉',
        index: '제8경',
        img:'img/sightsees/8.jpg',
        desc:'백두대간의 연봉 청오간의 한 봉우리로 수목이 울창하고 계곡과 자연경관이 아름다운 등산로이자 시민의 휴식공간으로 많은 이들이 즐겨 찾는 곳이다. 그 옛날 하느님이 혼탁한 세상에 장수를 보내어 세상을 바로잡게 하였다하고 임무를 완수한 장수가 하늘로 승천하기 위하여 힘껏 발디딤을 하였는데 그때 남겨진 장수의 발자국이 아직도 2개의 바위에 남아 있다는 전설이 있고 오늘날에도 소원을 빌기 위하여 많은 사람들이 이곳을 찾고 있다.',
        address:'천곡동 2통 일대',
        tel:'문화체육과(033-530-2441)'
      },
      {
        title: '망상오토캠핑리조트',
        index: '제9경',
        img:'img/sightsees/9.jpg',
        desc:'국내 최초로 조성된 자동차전용캠핑장으로 울창한 송림과 깨끗한 백사장, 맑은 비취빛 푸른 바다가 어우러진 자연친화적 레저공간으로서 우리나라에서는 처음으로 2002년 제64회 FICC세계캠핑캐라바닝대회(2002. 5. 16~5. 27)가 열린 곳이다. 망상오토캠핑리조트는 오토캠프장, 캐라반(일명 캠핑카), 캐빈하우스(통나무집), 아메리칸코테지(목조연립형주택), 훼밀리롯지 등의 친환경적이며 자연경관 보존형 시설을 중심으로 조성된 상설 캠프장으로 자동차와 텐트, 목조 숙영시설을 이용하는 가족단위의 새로운 신 레저 문화활동 공간이다. 해변과 함께 가족단위 휴양은 물론이고 기업체 및 단체, 대학생들의 연수나 M/T장소로 많이 이용되고 있다. 또한, 시설이용객들의 편의를 위하여 공동화장실 및 샤워장, 매점 및 휴게식당, 카페테리아, 클럽하우스, 놀이터, 해림정(팔각정자), 산책로 등 각종 편의시설들이 조성되어 있어 어느 휴양지에서도 느끼지 못하는 즐거운 휴식과 다양한 레저 활동을 접할 수 있을 것이다.',
        address:'동해대로 6370(망상동) 망상해변 관광지내',
        tel:'클럽하우스(033-539-6300~2)'
      }
    ];
    // Handle unexpected play
    $scope.$watch('API.currentState', function (newValue, oldValue) {
      if(!$scope.detailOn && newValue === 'play'){
        console.log('unexpected play')
        $scope.API.stop();
      }
    });

    $scope.detailOn = false;
    $scope.quizOn = false;
    $scope.galleryOn = false;
    var audio = new Audio('sounds/click.mp3');
    $scope.injectedObject = {};

    $rootScope.tapMenu = true;
    $scope.quizReady = false;
    $scope.$on("$ionicView.beforeEnter", function(event, data){
      $scope.setMenu()
    });

    $scope.$on("$ionicView.beforeEnter", function(event, data){
      TweenLite.set(".cnt",  {y:0})
    })
    $scope.$on("$ionicView.afterEnter", function(event, data){
      TweenLite.to(".cnt", 1, {
        y: function(index, target) {
          return (index + 1) * 5 // 100, 200, 300
        }
      })
    })

    $scope.$on("$ionicView.beforeLeave", function(event, data){
    });
    //Stop Play
    $scope.stopPlay = function(){
      $scope.API.stop();
    }
    //When audio is ready, Play it
    $scope.onPlayerReady = function(API){
      $scope.API = API;
      //$timeout(function() {$scope.API.play()}, 1000);
    }

    $scope.selectMenu = function(detail){
      audio.play()
      TweenMax.staggerTo('.cnt', 1.2, {y:-1300, ease:Elastic.easeOut});
      TweenMax.to('.back', 1.2, {alpha: true});
      TweenMax.set('.wrapper', {display:'none'});
      if(detail =='detail'){
        TweenLite.set('.bottomImg',{display:'none'})
        if($scope.API){}
        $scope.detailOn = true;
      }
    }
    $scope.setMenu = function(){
      audio.play()
      TweenMax.set('.wrapper', {display:'block'});
      TweenMax.set('.bottomImg', {display:'block'});
      TweenMax.set('.bottomImg',{y:0})
      TweenMax.from('.bottomImg',0.7,{y:200, display:'block'})
      TweenMax.staggerTo('.cnt', 1.2, {y:0, ease:Elastic.easeOut});
      if($scope.API!==undefined && $scope.API.currentState !=='stop')
        $scope.API.stop();
      //$scope.API.stop();
      $scope.detailOn = false
      $scope.quizOn = false;
      $scope.galleryOn = false;
      //$scope.injectedObject.invoke(); //Quiz Reset

    }
  });
