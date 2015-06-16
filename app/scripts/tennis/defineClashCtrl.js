(function (angular, k, _) {
	'use strict';

	angular.module('ScoreKeeper.Tennis')
		.controller('defineClash', ['$scope', '$location', 'Fray', 'GameTieModes', 'SetTieModes', 'LocalStore', function ($s, $l, fray, gameTieMode, setTieMode, store) {
			$s.details = fray.details;
			$s.gameTieModes = gameTieMode;
			$s.setTieModes = setTieMode;
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
			    fray.play();
			    store.save();
				$l.path('/play');
			};
		}])
		.filter('label', ['GameTieModes', 'SetTieModes', function (gameTieMode, setTieMode) {

			var labels = {};
			labels[gameTieMode.advantageWin] = 'Ad. Win';
			labels[gameTieMode.noAdvantageWin] = 'Dec. Point';
			labels[setTieMode.tieBreak] = 'Tie-Break (7)';
			labels[setTieMode.superTieBreak] = 'Super Tie-Break (10)';
			labels[setTieMode.gameDifference] = '2-Game Diff.';

			return function (input) {
				return labels[input] || input;
			};
		}]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);