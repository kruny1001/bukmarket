'use strict';
/**
 * @ngdoc directive
 * @name starter.directive:slideQuiz
 * @description
 * # slideQuiz
 */
angular.module('starter')
	.directive('pixiCam', function ($compile) {
		return {
			template:
			'<div class="photobooth" style="height: 0px;">'+
			//'<div class="md-display-4" style="z-index:999; margin:20px; color:white; padding: 10px; position: absolute;" id="count" display:none> 1 </div>'+
			'<img style="position: absolute;" id="result" ng-style="{{result}}">'+
			'<video id="video" width="0" height="0"></video>'+
			'</div>',
			restrict: 'E',
			scope:{shutter: '='},
			link:{
				pre:function (scope, element, attrs) {
					scope.items = [
						{ style:{background: "url('img/camDeco/c1.png')", backgroundSize:'cover', backgroundSize: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa1_hd.png', selected: false},
						{ style:{background: "url('img/camDeco/c2.png')", backgroundSize:'cover', backgroundSize: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa2_hd.png', selected: false},
						{ style:{background: "url('img/camDeco/c3.png')", backgroundSize:'cover', backgroundSize: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa4_hd.png', selected: false},
						{ style:{background: "url('img/camDeco/buklogo.png')", backgroundSize:'cover', backgroundSize: "67%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa4_hd.png', selected: false},
						{ style:{background: "url('img/camDeco/cow1.png')", backgroundSize:'cover', backgroundSize: "67%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa4_hd.png', selected: false},
						{ style:{background: "url('img/camDeco/cow2.png')", backgroundSize:'cover', backgroundSize: "67%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa4_hd.png', selected: false},
						{ style:{background: "url('img/camDeco/cow3.png')", backgroundSize:'cover', backgroundSize: "67%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa4_hd.png', selected: false},
						{ style:{background: "url('img/camDeco/cow4.png')", backgroundSize:'cover', backgroundSize: "67%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}, sourceUrl:'img/aoa4_hd.png', selected: false},
					];
				},
				post:function (scope, element, attrs){
					var GAME_WIDTH = 800;  // Conceptual dimensions of the game
					var GAME_HEIGHT = 600;

					var renderer;
					var stage;

					var background;
					var foreground;
					var BG_RATE = 50;
					var FG_RATE = 125;

					var monster;
					var FRAMES = [
						"frame-1.png",
						"frame-2.png",
						"frame-3.png",
						"frame-4.png",
					];
					var frameindex;
					var frametime;
					var FRAMERATE = 0.08;
					var VELOCITY = 100;
					var lasttime;

					function preload() {
						createrenderer(); // Create renderer to test which kind in loading,
					                    // do preloader animations (not implemented)

						var loader = PIXI.loader;
						loader.reset();
						if (window.devicePixelRatio >= 2) {
							//loader.add("monster", "image/monster@2x.json");
							loader.add("monster", "img/PIXI/monster.json");
						} else {
							loader.add("monster", "img/PIXI/monster.json");
						}
						if (window.devicePixelRatio >= 2 &&
							renderer instanceof PIXI.WebGLRenderer) {
							// WebGL clause works around an apparent issues with
							// TilingSprites on high-res devices using canvas:
							// https://github.com/pixijs/pixi.js/issues/2083
							//loader.add("background", "dImages/PIXI/background@2x.png");
							//loader.add("foreground", "dImages/PIXI/foreground@2x.png");
							loader.add("background", "img/PIXI/background.png");
							loader.add("foreground", "img/PIXI/foreground.png");
						} else {
							loader.add("background", "img/PIXI/background.png");
							loader.add("foreground", "img/PIXI/foreground.png");
						}

						loader.once('complete', init);
						loader.load();
					}

					function createrenderer() {
						var rendererOptions = {
							antialiasing: false,
							transparent: false,
							resolution: window.devicePixelRatio,
							autoResize: true,
							preserveDrawingBuffer:true
						}

						// Create the canvas in which the game will show, and a
						// generic container for all the graphical objects
						renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,
							rendererOptions);

						// Put the renderer on screen in the corner
						//renderer.view.style.position = "absolute";
						renderer.view.style.top = "0px";
						renderer.view.style.left = "0px";

						// The stage is essentially a display list of all game objects
						// for Pixi to render; it's used in resize(), so it must exist
						stage = new PIXI.Container();

						// Size the renderer to fill the screen
						resize();

						// Actually place the renderer onto the page for display
						renderer.view.style.borderTop = '8px red solid';
						renderer.view.style.borderBottom = '8px red solid';
						//renderer.view.style.transform= 'rotateY(180deg)'; //mirroring
						element.append(renderer.view);
						var menu =
							'<div layout-padding>' +
								'<br>'+
								'<span class="front-meun-font"> 꾸미기 </span>'+
								'<br>'+
							' <md-virtual-repeat-container id="horizontal-container" md-orient-horizontal style="background:white">'+
							'<div md-virtual-repeat="item in items" class="repeated-item" ng-click="overlayImg(item, $index)" flex ng-style="item.style">' +
							'<div ng-show="item.selected" style="background:rgba(0, 0, 0, 0.3); position: absolute;"> ' +
							'<md-icon md-svg-src="icons/checkmark.svg" style="color: #baff6f;width:60px;height:60px;" aria-label="Cake Icon"></md-icon> </div>'+
							'</div>'+
							'</md-virtual-repeat-container>'+
							'</div>';
						menu = angular.element(menu)
						menu = $compile(menu)(scope);
						element.append(menu)

						// Listen for and adapt to changes to the screen size, e.g.,
						// user changing the window or rotating their device
						window.addEventListener("resize", resize);

						// Mod the title so it's easy to determine renderer on mobile
						if (renderer instanceof PIXI.WebGLRenderer) {
							document.title += " (WebGL)";
						} else {
							document.title += " (Canvas)";
						}
					}

					var texture;
					var aoa, aoa2, aoa3, aoa4, cow1, cow2, cow3, cow4, back;
					var moveSprite;

					function init() {
						console.log("Init");
						var video = document.getElementById('video');

						var vendorUrl = window.URL || window.webkitURL;

						// create a crop object that will be calculated on load of the video
						var crop;
						// create a variable that will enable us to stop the loop.
						var raf;

						navigator.getMedia = navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia;

						navigator.getMedia({
							video: true,
							//video: { facingMode: "user" },
							//video: { facingMode: { exact: "environment" } },
							audio: false
						},
							function (stream) {
							video.src = vendorUrl.createObjectURL(stream);
							// Test Code
							// video.onplaying = function(){
							// 	var croppedWidth = ( Math.min(video.videoHeight, canvas.height) / Math.max(video.videoHeight,canvas.height)) * Math.min(video.videoWidth, canvas.width),
							// 	croppedX = ( video.videoWidth - croppedWidth) / 2;
							// 	crop = {w:croppedWidth, h:video.videoHeight, x:croppedX, y:0};
							// 	// call our loop only when the video is playing
							// 	//raf = requestAnimationFrame(loop);
							// };
							// Test Code
							// console.log(video.style)

							var videoContainer = new PIXI.Container();
							stage.addChild(videoContainer);
							texture = PIXI.Texture.fromVideo(video);
							texture.rotate = 12; // horizontally flip
							moveSprite = new PIXI.Sprite(texture);
							moveSprite.width = 800;
							moveSprite.height = 600;
							moveSprite.scale.x = 1;
							moveSprite.scale.y = 1;

							video.play();
							videoContainer.addChild(moveSprite);
							//videoContainer.rotation = .5;

							aoa = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/c1.png'));
							// aoa.anchor.x = 1.5;
							// aoa.anchor.y = 1.5;
							aoa.height = 100;
							aoa.width = 312;
							aoa.interactive = true;
							// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
							aoa.buttonMode = true;
							aoa
							// events for drag start
								.on('mousedown', onDragStart)
								.on('touchstart', onDragStart)
								// events for drag end
								.on('mouseup', onDragEnd)
								.on('mouseupoutside', onDragEnd)
								.on('touchend', onDragEnd)
								.on('touchendoutside', onDragEnd)
								// events for drag move
								.on('mousemove', onDragMove)
								.on('touchmove', onDragMove);

							aoa2 = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/c2.png'));
							aoa2.height = 185;
							aoa2.width = 343;
							aoa2.interactive = true;

							// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
							aoa2.buttonMode = true;
							aoa2
							// events for drag start
								.on('mousedown', onDragStart)
								.on('touchstart', onDragStart)
								// events for drag end
								.on('mouseup', onDragEnd)
								.on('mouseupoutside', onDragEnd)
								.on('touchend', onDragEnd)
								.on('touchendoutside', onDragEnd)
								// events for drag move
								.on('mousemove', onDragMove)
								.on('touchmove', onDragMove);

							aoa3 = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/c3.png'));
							aoa3.height = 150;
							aoa3.width = 150;
							aoa3.interactive = true;
							// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
							aoa3.buttonMode = true;
							aoa3
							// events for drag start
								.on('mousedown', onDragStart)
								.on('touchstart', onDragStart)
								// events for drag end
								.on('mouseup', onDragEnd)
								.on('mouseupoutside', onDragEnd)
								.on('touchend', onDragEnd)
								.on('touchendoutside', onDragEnd)
								// events for drag move
								.on('mousemove', onDragMove)
								.on('touchmove', onDragMove);

							aoa4 = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/buklogo.png'));
							aoa4.height = 150;
							aoa4.width = 100;
							aoa4.interactive = true;
							// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
							aoa4.buttonMode = true;
							aoa4
							// events for drag start
								.on('mousedown', onDragStart)
								.on('touchstart', onDragStart)
								// events for drag end
								.on('mouseup', onDragEnd)
								.on('mouseupoutside', onDragEnd)
								.on('touchend', onDragEnd)
								.on('touchendoutside', onDragEnd)
								// events for drag move
								.on('mousemove', onDragMove)
								.on('touchmove', onDragMove);

								cow1 = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/cow1.png'));
								cow1.height = 150;
								cow1.width = 120;
								cow1.interactive = true;
								// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
								cow1.buttonMode = true;
								cow1
								// events for drag start
									.on('mousedown', onDragStart)
									.on('touchstart', onDragStart)
									// events for drag end
									.on('mouseup', onDragEnd)
									.on('mouseupoutside', onDragEnd)
									.on('touchend', onDragEnd)
									.on('touchendoutside', onDragEnd)
									// events for drag move
									.on('mousemove', onDragMove)
									.on('touchmove', onDragMove);

									cow2 = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/cow2.png'));
									cow2.height = 150;
									cow2.width = 120;
									cow2.interactive = true;
									// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
									cow2.buttonMode = true;
									cow2
									// events for drag start
										.on('mousedown', onDragStart)
										.on('touchstart', onDragStart)
										// events for drag end
										.on('mouseup', onDragEnd)
										.on('mouseupoutside', onDragEnd)
										.on('touchend', onDragEnd)
										.on('touchendoutside', onDragEnd)
										// events for drag move
										.on('mousemove', onDragMove)
										.on('touchmove', onDragMove);

										cow3 = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/cow3.png'));
										cow3.height = 150;
										cow3.width = 150;
										cow3.interactive = true;
										// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
										cow3.buttonMode = true;
										cow3
										// events for drag start
											.on('mousedown', onDragStart)
											.on('touchstart', onDragStart)
											// events for drag end
											.on('mouseup', onDragEnd)
											.on('mouseupoutside', onDragEnd)
											.on('touchend', onDragEnd)
											.on('touchendoutside', onDragEnd)
											// events for drag move
											.on('mousemove', onDragMove)
											.on('touchmove', onDragMove);

											cow4 = new PIXI.Sprite(PIXI.Texture.fromImage('img/camDeco/cow4.png'));
											cow4.height = 150;
											cow4.width = 120;
											cow4.interactive = true;
											// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
											cow4.buttonMode = true;
											cow4
											// events for drag start
												.on('mousedown', onDragStart)
												.on('touchstart', onDragStart)
												// events for drag end
												.on('mouseup', onDragEnd)
												.on('mouseupoutside', onDragEnd)
												.on('touchend', onDragEnd)
												.on('touchendoutside', onDragEnd)
												// events for drag move
												.on('mousemove', onDragMove)
												.on('touchmove', onDragMove);
					}, function (err) {
						alert(err);
					});

						// Prepare for first frame of game loop/animation
						lasttime = new Date().getTime();
						requestAnimationFrame(animate);
					}

					function onDragStart(event) {
						// store a reference to the data
						// the reason for this is because of multitouch
						// we want to track the movement of this particular touch
						this.data = event.data;
						this.alpha = 0.5;
						this.dragging = true;
					}
					function onDragEnd() {
						this.alpha = 1;
						this.dragging = false;
						// set the interaction data to null
						this.data = null;
					}
					function onDragMove() {
						if (this.dragging)
						{
							var newPosition = this.data.getLocalPosition(this.parent);
							this.position.x = newPosition.x;
							this.position.y = newPosition.y;
						}
					}
					scope.overlayImg = function(item, id){
						scope.items[id].selected = !item.selected;
						console.log(id, scope.items[id].selected)
						if(scope.items[id].selected)
							scope.showBackground(id+1)
						else
							scope.hideBackground(id+1)
					}
					scope.showBackground = function(id){
						if(id==1)
							stage.addChild(aoa)
						else if(id==2)
							stage.addChild(aoa2)
						else if(id==3)
							stage.addChild(aoa3)
						else if(id==4)
							stage.addChild(aoa4)
						else if(id==5)
								stage.addChild(cow1)
						else if(id==6)
								stage.addChild(cow2)
						else if(id==7)
								stage.addChild(cow3)
						else if(id==8)
								stage.addChild(cow4)
					}
					scope.hideBackground = function(id){
						if(id==1)
							stage.removeChild(aoa)
						else if(id==2)
							stage.removeChild(aoa2)
						else if(id==3)
							stage.removeChild(aoa3)
						else if(id==4)
							stage.removeChild(aoa4)
						else if(id==5)
							stage.removeChild(cow1)
						else if(id==6)
							stage.removeChild(cow2)
						else if(id==7)
							stage.removeChild(cow3)
						else if(id==8)
							stage.removeChild(cow4)
					}

					function resize() {
						// Determine which screen dimension is most constrained
						var ratio = Math.min(window.innerWidth/GAME_WIDTH,
							window.innerHeight/GAME_HEIGHT);
						// Scale the view appropriately to fill that dimension
						stage.scale.x = stage.scale.y = ratio;
						// Update the renderer dimensions
						renderer.resize(Math.ceil(GAME_WIDTH * ratio) + 0.5,
							Math.ceil(GAME_HEIGHT * ratio));
					}
					function animate() {
						//stage.rotation= 1;
						//console.log(stage.)
						//console.log(stream)
						// Determine seconds elapsed since last frame
						var currtime = new Date().getTime();
						var delta = (currtime-lasttime)/1000;
						// Draw the stage and prepare for the next frame
						renderer.render(stage);
						requestAnimationFrame(animate);
						lasttime = currtime;
					}
					preload();
				}
			}
		};
	});
