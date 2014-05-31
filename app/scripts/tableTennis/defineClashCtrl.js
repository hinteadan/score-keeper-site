(function (angular, k, _) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
		.controller('defineClash', ['$scope', '$location', 'Clash', function ($scope, $location, clash) {
			$scope.clashDetails = clash.details;
			$scope.parties = clash.parties;
			$scope.receivingParty = function () {
				if (!clash.details.firstToServe) {
					return null;
				}
				return _.find(clash.parties, function (p) {
					return !_.contains(p.individuals, clash.details.firstToServe);
				});
			};
			$scope.next = function () {
				$location.path('/play');
			};
		}]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);