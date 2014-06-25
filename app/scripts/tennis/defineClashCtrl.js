(function (angular, k, _) {
	'use strict';

	angular.module('ScoreKeeper.Tennis')
		.controller('defineClash', ['$scope', '$location', 'Fray', function ($s, $l, fray) {
			$s.details = fray.details;
			$s.parties = fray.parties;
			$s.receivingParty = function () {
				if (!fray.details.firstToServe) {
					return null;
				}
				return _.find(fray.parties, function (p) {
					return !_.contains(p.individuals, fray.details.firstToServe);
				});
			};
			$s.next = function () {
				$l.path('/play');
			};
		}]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);