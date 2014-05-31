(function (angular, k) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
		.controller('defineParties', ['$scope', function ($scope) {
			var parties = [
				new k.Party(),
				new k.Party()
			];

			$scope.parties = parties;

		}]);

}).call(this, this.angular, this.H.ScoreKeeper);