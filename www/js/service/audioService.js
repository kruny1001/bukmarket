'use strict';

angular.module('starter')
	.factory('AudioService', function ($sce) {
		var handonResource = function(lang){
			var resource = {}
			if(lang ==="kr")
				resource = {sources: [{src: $sce.trustAsResourceUrl("http://res.cloudinary.com/dbfirebase/video/upload/v1481878459/bukMarket/logosong.mp3"), type: "audio/mpeg"}]};
			return resource;
		}

		return{
			handonResource : handonResource,
		}
	})
