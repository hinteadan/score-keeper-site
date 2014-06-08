(function (angular, k) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')

		.controller('play', ['$scope', 'Clash', 'PointDetails', function ($scope, clash, PointDetails) {
			$scope.clash = clash.clash();
			$scope.scoreProjection = clash.projectScore().now();
			$scope.pointDetails = {
				current: new PointDetails(),
				reasons: PointDetails.reason,
				spins: PointDetails.spin,
				handles: PointDetails.handle
			};
			$scope.pointFor = function (party) {
				$scope.clash.pointWith($scope.pointDetails.current).for(party);
				$scope.pointDetails.current = new PointDetails();
				$scope.scoreProjection = clash.projectScore().now();
			};
			$scope.undoPoint = function () {
				$scope.clash.undoPoint();
				$scope.scoreProjection = clash.projectScore().now();
			};
			$scope.pointCreditPossibleMembers = function (scoringParty) {
				return $scope.pointDetails.current.reason == PointDetails.reason.unforcedErrorByOpponent ?
					clash.theOtherParty(scoringParty).individuals :
					scoringParty.individuals;
			};
		}])

		.filter('pointLabel', ['PointDetails', function (PointDetails) {
			return function (input) {
				switch (input) {
					case PointDetails.reason.winningShot: return 'Winning Shot';
					case PointDetails.reason.forcedErrorOnOpponent: return 'Forced Error';
					case PointDetails.reason.unforcedErrorByOpponent: return 'Unforced Error';
					default: return input;
				}
			};
		}]);

}).call(this, this.angular, this.H.ScoreKeeper);