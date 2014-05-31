(function (angular, k) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
		.controller('defineClash', ['$scope', 'Clash', function ($scope, clash) {
			$scope.clashDetails = clash.details;
		}]);

}).call(this, this.angular, this.H.ScoreKeeper);