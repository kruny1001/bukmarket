/*
App Container

*/
﻿app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $rootScope, $state) {
    // Form data for the login modal
    $scope.loginData = {};
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
    //var fab = document.getElementById('fab');
    //fab.addEventListener('click', function () {
    //    //location.href = 'https://twitter.com/satish_vr2011';
    //    window.open('https://twitter.com/satish_vr2011', '_blank');
    //});
    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';
    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    $scope.langs = ['Korean', 'Japanese', 'Chinese'];
    $scope.topDirections = ['left', 'up'];
    $scope.bottomDirections = ['down', 'right'];
    $scope.isOpen = false;
    $scope.availableModes = ['md-fling', 'md-scale'];
    $scope.selectedMode = 'md-fling';
    $scope.availableDirections = ['up', 'down', 'left', 'right'];
    $scope.selectedDirection = 'up';

    //Click Sounds
    var audio = new Audio('sounds/click.mp3');
    $scope.sound = function(){
      audio.play();
    }
    $scope.clickBottomMenu = function() {
      console.log('menu reset ');
      $rootScope.$broadcast('reset-submenu');
      $state.go('app.market');
    }
    TweenLite.to('.bottomImg', .4 ,{scale:.5, bottom:-30})
});
