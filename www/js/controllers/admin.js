app.controller('AdminCtrl',
  function ($scope, $rootScope, $ionicModal, $ionicPopover, $timeout, $firebaseArray, PixiVideoAdmin) {
    var vidRef = firebase.database().ref('videos');
    $scope.videos = $firebaseArray(vidRef);

    $rootScope.tapMenu = false;
    $scope.vidoeInfo = {
      id:'bukmarket',
      option:{
        startAtUrl: ""
      },
      sources:[{videoUrl:'', title:''}],
      expire: {
        startDate: 12,
        endDate: 12,
        accountLevel: 1,
      }
    };
    $scope.audioInfo = {};
    $scope.createVideo = function(){
      $scope.videos.push($scope.videoInfo);
    }

    $scope.$on("$ionicView.afterEnter", function(event, data){
      PixiVideoAdmin.initVideoAdmin('pixi');
    })

})
