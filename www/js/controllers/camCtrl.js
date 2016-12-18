'use strict';

/**
 * @ngdoc function
 * @name starter.controller:View1Ctrl
 * @description
 * # View1Ctrl
 * Controller of the starter
 */
angular.module('starter')
	.controller('CamCtrl', function ($scope, $sce, $location, $mdDialog, $timeout, $rootScope, $state) {
		TweenLite.set('.bottomImg',{display:'none'});
		TweenLite.set('.uploading-img',{display:'none'});
		var photoBooth = angular.element().find('.photobooth');
		var audio = new Audio('https://webcamtoy.com/assets/audio/capture.ogg');
		var beep = new Audio("https://webcamtoy.com/assets/audio/countdown.ogg");
		$rootScope.tapMenu = true;
		var uploadTask;
		$scope.readyToSend = false;
		$scope.readyImage = false;
		$scope.cancel = function(){
			$scope.readyToSend = false;
			$scope.readyImage = false;
			var img = angular.element($('#result'))
			img.css({
				display:'none'
			})
		};
		$scope.sendEmail = function(){
			var imgTag = document.getElementById('result')
			var imgData = imgTag.src;
			function dataURItoBlob(dataURI) {
				var binary = atob(dataURI.split(',')[1]);
				var array = [];
				for(var i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
			}
			$scope.readyToSend = false;
			$scope.readyImage = false;
			TweenLite.set('.uploading-img', {display:'block'})
			var blob = dataURItoBlob(imgData);
			var storageRef = firebase.storage().ref();
			uploadTask = storageRef.child('images/pic'+ new Date().getTime() +'.jpg').put(blob);
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				function(snapshot) {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					$scope.progress = progress;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
					}
				},
				function(err){
					TweenLite.set('.uploading-img', {display:'none'})
					switch (err.code) {
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;
						case 'storage/canceled':
							// User canceled the upload
							break;
						case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				function(){
					TweenLite.set('.uploading-img', {display:'none'})
					// Upload completed successfully, now we can get the download URL
					var downloadURL = uploadTask.snapshot.downloadURL;
					$scope.result = downloadURL;
					$scope.$digest();
					//show dialog
					$mdDialog.show({
						controller: DialogCtrl,
						locals : {
							targetSrc : {src:downloadURL}
						},
						templateUrl: 'templates/dialogs/sendEmail.html',
						parent: angular.element(document.body),
						//targetEvent: ev,
						clickOutsideToClose:true,
						//fullscreen: useFullScreen
					})
					function DialogCtrl($scope, $http, $mdDialog, $rootScope, targetSrc) {
						$scope.targetSrc = targetSrc;
						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};

						var emailConfirm = function(){
							if($rootScope.lang=='kr'){
								$scope.confirmMsg={
									title: '사진전송',
									body: '이메일 전송이 완료 되었습니다.',
									btnName: '확인'
								}
							}
							$mdDialog.show(
								$mdDialog.alert()
									.parent(angular.element(document.querySelector('body')))
									.clickOutsideToClose(true)
									.title($scope.confirmMsg.title)
									.textContent($scope.confirmMsg.body)
									.ok($scope.confirmMsg.btnName)
							);
						}

						$scope.sendEmail = function(email) {
							if(email === null || email === undefined)
								$scope.err = "Email is required";
							//https://ybroad-kfpd.herokuapp.com/handon/sendgrid/confirm
							console.log(email);
							$http({
								method: 'POST',
								url: 'https://ybroad-kfpd.herokuapp.com/bukmarket/sendgrid/confirm',
								data: {
									sourceUrl: $scope.targetSrc.src,
									to:email
								}
							}).then(function successCallback(response) {
								console.log(response)
								emailConfirm();
							}, function errorCallback(response) {
								console.log(response)
								emailConfirm(); // This should be change with error message
							});
							$mdDialog.hide();
						};
					}
					$scope.cancel();
				}
			);
		}

		$scope.qrCode = function(){
			var canvas = document.querySelector('canvas')
			var imgTag = document.getElementById('result')
			var imgData = imgTag.src;
			//canvas.toBlob(function(blob) {
			function dataURItoBlob(dataURI) {
				var binary = atob(dataURI.split(',')[1]);
				var array = [];
				for(var i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
			}

			var blob = dataURItoBlob(imgData);

			var storageRef = firebase.storage().ref();
			uploadTask = storageRef.child('images/pic'+ new Date().getTime() +'.jpg').put(blob);
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				function(snapshot) {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
					}
				},
				function(err){
					switch (err.code) {
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;

						case 'storage/canceled':
							// User canceled the upload
							break;

						case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				function() {
					var downloadURL = uploadTask.snapshot.downloadURL;
					$scope.result = downloadURL;
					$mdDialog.show({
						controller: DialogCtrl,
						locals: {
							targetSrc: {src: downloadURL}
						},
						templateUrl: 'templates/dialogs/qrCode.html',
						parent: angular.element(document.body),
						//targetEvent: ev,
						clickOutsideToClose: true,
						//fullscreen: useFullScreen
					})
				})
			function DialogCtrl($scope, $mdDialog, targetSrc) {
				$scope.targetSrc = targetSrc;
				$scope.hide = function() {
					$mdDialog.hide();
				};
				$scope.cancel = function() {
					$mdDialog.cancel();
				};
				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}
			$scope.cancel();
		}

		$scope.preview = function(){
			var canvas = document.querySelector('canvas')
			$scope.readyToSend = true;
			$scope.shutter = {counter:5};
			$scope.capture();
			var a = angular.element($('.photobooth'))
			var count = angular.element(
				'<div class="md-display-4" id="count" display:none></div>')
				count.css({
					position: 'absolute',
					width: '100%',
					textAlign: 'center',
					top: '400px',
					zIndex: 999,
					margin: '20px',
					color:'white',
					padding:'10px'
				})
			a.append(count);


			TweenLite.to($scope.shutter, $scope.shutter.counter, {counter: "0", roundProps: "counter",
				onUpdate:updateHandler, ease:Linear.easeNone,
				onStart:function(){beep.play()},
				onComplete:function(){audio.play();}
			})
			function updateHandler() {
				console.log(a)
				count.text($scope.shutter.counter);
				console.log($scope.shutter.counter)
				$scope.shutter.counter;
				if($scope.shutter.counter == 0){
					count.remove();
					$scope.readyToSend = true;
					$scope.readyImage = true;
					$scope.$digest();
					var imgTag = document.getElementById('result')
					var img = angular.element($('#result'))
					img.css({
						display:'block',
						width:canvas.clientWidth+'px',
						height:canvas.clientHeight+'px',
					})
					imgTag = document.getElementById('result')
					var imgData = canvas.toDataURL("image/png", 0.8)
					imgTag.src = imgData;
				}
			}
		}

		$scope.capture = function(){
			console.log('capture invoked');
			//Get a Canvas
			var canvas = document.querySelector('canvas')
			var imgData = canvas.toDataURL("image/png")

			function dataURItoBlob(dataURI) {
				var binary = atob(dataURI.split(',')[1]);
				var array = [];
				for(var i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
			}
			var blob = dataURItoBlob(imgData);
			var storageRef = firebase.storage().ref();
			uploadTask = storageRef.child('hidden/pic'+ new Date().getTime() +'.jpg').put(blob);
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				function(snapshot) {
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
					}
				},
					function(err){
						switch (err.code) {
							case 'storage/unauthorized':
								// User doesn't have permission to access the object
								break;

							case 'storage/canceled':
								// User canceled the upload
								break;

							case 'storage/unknown':
								// Unknown error occurred, inspect error.serverResponse
								break;
						}
					},
					function(){
						// Upload completed successfully, now we can get the download URL
						var downloadURL = uploadTask.snapshot.downloadURL;
						$scope.result = downloadURL;
						$scope.$digest();
					}
				);
			//});

		}

	});
