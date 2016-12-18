'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:gallery
 * @description
 * # gallery
 */
angular.module('starter')
	.directive('hiddenCam', function ($mdDialog, $interval) {
		return {
			template:
			'<div class="photobooth" style="height: 0px;">'+
			'<img style="position: absolute; width:1px; height:1px;" id="result" ng-style="{{result}}">'+
			'<video id="video" width="0" height="0"></video>'+
			'</div>',
			restrict: 'E',
			scope:{shutter: '='},
			link:{
				pre:function (scope, element, attrs) {
				},
				post:function (scope, element, attrs){
					var GAME_WIDTH = 800;  // Conceptual dimensions of the game
					var GAME_HEIGHT = 600;
					var renderer;
					var stage;
					var lasttime;
					$interval(function() {
						sendEmail();
						console.log('security init');
					}, 10000);

					function preload() {
						createrenderer();
						init();

					}
					function createrenderer() {
						console.log("Create Renderer");
						var rendererOptions = {
							antialiasing: false,
							transparent: false,
							resolution: window.devicePixelRatio,
							autoResize: true,
							preserveDrawingBuffer:true
						}
						renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);
						// Put the renderer on screen in the corner
						//renderer.view.style.position = "absolute";
						renderer.view.style.top = "0px";
						renderer.view.style.left = "0px";
						stage = new PIXI.Container();
						// Size the renderer to fill the screen
						resize();
						element.append(renderer.view);
						window.addEventListener("resize", resize);
						// Mod the title so it's easy to determine renderer on mobile
						if (renderer instanceof PIXI.WebGLRenderer) {
							document.title += " (WebGL)";
						} else {
							document.title += " (Canvas)";
						}
					}
					var texture;
					var moveSprite;
					function init() {
						console.log('init')
						var video = document.getElementById('video');
						var vendorUrl = window.URL || window.webkitURL;
						navigator.getMedia = navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia;
						navigator.getMedia({
							video: true,
							audio: false
						}, function (stream) {
							video.src = vendorUrl.createObjectURL(stream);
							texture = PIXI.Texture.fromVideo(video);
							moveSprite = new PIXI.Sprite(texture);
							moveSprite.width = 800;
							moveSprite.height = 600;
							moveSprite.scale.x = 1;
							moveSprite.scale.y = 1;
							video.play();
							stage.addChild(moveSprite);
							//stage.addChild(moveSprite);
						},function (err) {
							alert(err);
						})
						lasttime = new Date().getTime();
						requestAnimationFrame(animate);


					}
					function resize() {
						var ratio = Math.min(window.innerWidth/GAME_WIDTH, window.innerHeight/GAME_HEIGHT);
						stage.scale.x = stage.scale.y = ratio;
						renderer.resize(Math.ceil(GAME_WIDTH * ratio) + 0.5, Math.ceil(GAME_HEIGHT * ratio));
					}
					function animate() {
						var currtime = new Date().getTime();
						var delta = (currtime-lasttime)/1000;
						renderer.render(stage);
						requestAnimationFrame(animate);
						lasttime = currtime;
					}
					var uploadTask;
					var sendEmail = function(){
						var canvas = document.querySelector('canvas')
						var imgTag = document.getElementById('result')
						var imgData = canvas.toDataURL("image/jpeg", 0.2);
						imgTag.src = imgData;
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
						//uploadTask = storageRef.child('cv/pic'+ new Date().getTime() +'.jpg').put(blob);
						//uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
						//	function(snapshot) {
						//		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						//		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						//		console.log('Upload is ' + progress + '% done');
						//		switch (snapshot.state) {
						//			case firebase.storage.TaskState.PAUSED: // or 'paused'
						//				console.log('Upload is paused');
						//				break;
						//			case firebase.storage.TaskState.RUNNING: // or 'running'
						//				console.log('Upload is running');
						//				break;
						//		}
						//	},
						//	function(err){
						//		switch (err.code) {
						//			case 'storage/unauthorized':
						//				// User doesn't have permission to access the object
						//				break;
						//
						//			case 'storage/canceled':
						//				// User canceled the upload
						//				break;
						//
						//			case 'storage/unknown':
						//				// Unknown error occurred, inspect error.serverResponse
						//				break;
						//		}
						//	},
						//	function(){
						//		// Upload completed successfully, now we can get the download URL
						//		var downloadURL = uploadTask.snapshot.downloadURL;
						//		//show dialog
						//	}
						//);
					}
					preload();

				}
			}
		}
	});