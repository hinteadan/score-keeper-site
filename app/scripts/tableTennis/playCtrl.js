(function (angular, k) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
		.controller('play', ['$scope', 'Clash', 'PointDetails', function ($scope, clash, PointDetails) {
			$scope.clash = clash.clash();
			$scope.pointDetails = {
				basic: new PointDetails(PointDetails.reason.winningShot, PointDetails.spin.flat, PointDetails.handle.forehand)
			};
		}]);

}).call(this, this.angular, this.H.ScoreKeeper);