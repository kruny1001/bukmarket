/**
 * Created by kruny1001 on 5/27/16.
 */
'use strict';

angular.module('starter')
	.factory('VideoService', function ($sce, $timeout) {
		var handonResource = function(lang){}

		var state = null;
		var API = null;
		var currentVideo = 0;
		var isCompleted = true;

		var onPlayerReady = function(API){
			var API = API;
			$timeout(function(){API.play()}, 2000);
		}

		var onCompleteVideo = function() {
			var isCompleted = true;
			currentVideo++;
			if (currentVideo >= videos.length) currentVideo = 0;
			setVideo(currentVideo);
		};

		var videos = [
			{sources: [{src: "https://www.youtube.com/watch?v=6nKawY809ew"}]},
			{sources: [{src: "https://www.youtube.com/watch?v=4DjXOSeWl0E"}]},//입맛 없을 땐 한돈 소이 갈릭 삼겹살 덮밥
			{sources: [{src: "https://www.youtube.com/watch?v=0Hha6Ps6oWo"}]},//한 끼 뚝딱 해결하는 한돈 스테이크비빔밥
			{sources: [{src: "https://www.youtube.com/watch?v=EZ4WQdrN6FQ"}]},
			{sources: [{src: "https://www.youtube.com/watch?v=T-gosSeo7F4"}]},
			{sources: [{src: "https://www.youtube.com/watch?v=hOpXmJDyTto"}]},
			{sources: [{src: "https://www.youtube.com/watch?v=Lwz0zV8GlTQ"}]},
			{sources: [{src: "https://www.youtube.com/watch?v=04rHDWY8X1g"}]},
			{sources: [{src: "https://www.youtube.com/watch?v=sZkW0aWYNgQ"}]},
			{sources: [{src: "https://www.youtube.com/watch?v=zZJ4krDtrJA"}]},
		];

		var setVideo = function(index) {
			API.stop();
			currentVideo = index;
			config.sources = $scope.videos[index].sources;
			$timeout(API.play.bind(API), 100);
		};

		var config = {
			preload: "none",
			sources: $scope.videos[0].sources,
			theme: "lib/videogular-themes-default/videogular.css",
		};

		return {

		}
	});
