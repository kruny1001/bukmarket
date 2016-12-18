/**
 * Created by kruny1001 on 5/10/16.
 */
'use strict';

/**
 * @ngdoc directive
 * @name starter.directive:brandLogo
 * @description
 * # brandLogo
 */
angular.module('starter')
	.directive('newsBar', function () {
		return {
			templateUrl: 'templates/directive/news-bar.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				scope.source = [{text:'Dec 11, 2012 - ng-class - use when the set of CSS styles is static/known ahead of time ... The normal "Angular way" involves tying a model/scope property to a UI element .... If you want to apply a class to the table for example, when visiting a ...'}, {text:'Dec 11, 2012 - ng-class - use when the set of CSS styles is static/known ahead of time ... The normal "Angular way" involves tying a model/scope property to a UI element .... If you want to apply a class to the table for example, when visiting a ...'}, {text:'Dec 11, 2012 - ng-class - use when the set of CSS styles is static/known ahead of time ... The normal "Angular way" involves tying a model/scope property to a UI element .... If you want to apply a class to the table for example, when visiting a ...'} ];
			}
		};
	});