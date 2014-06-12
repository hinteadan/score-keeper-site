﻿(function (angular) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')

		.controller('play', ['$scope', 'Clash', 'PointDetails', 'ClashLocalStore', function ($scope, clash, PointDetails, clashStore) {
			/// <param name='clashStore' type='storage.LocalStore' />

			$scope.clash = clash.clash;
			$scope.scoreProjection = clash.projectScore().now();
			$scope.pointDetails = {
				current: new PointDetails(),
				reasons: PointDetails.reason,
				spins: PointDetails.spin,
				handles: PointDetails.handle
			};
			$scope.pointFor = function (party) {
				$scope.clash().pointWith($scope.pointDetails.current).for(party);
				$scope.pointDetails.current = new PointDetails();
				$scope.scoreProjection = clash.projectScore().now();
				clashStore.save();
			};
			$scope.undoPoint = function () {
				$scope.clash().undoPoint();
				$scope.scoreProjection = clash.projectScore().now();
				clashStore.save();
			};
			$scope.pointCreditPossibleMembers = function (scoringParty) {
				return $scope.pointDetails.current.reason === PointDetails.reason.unforcedErrorByOpponent ?
					clash.theOtherParty(scoringParty).individuals :
					scoringParty.individuals;
			};
			$scope.commit = function () {
			    clash.stop();
			    clashStore.zap(clash);
                //TODO Commit to HTTP Store
			};
		}])

		.filter('pointLabel', ['PointDetails', function (PointDetails) {
			return function (input) {
				switch (input) {
					case PointDetails.reason.winningShot: return 'Winner';
					case PointDetails.reason.forcedErrorOnOpponent: return 'Forced Er.';
					case PointDetails.reason.unforcedErrorByOpponent: return 'Unforced Er.';
					default: return input;
				}
			};
		}]);

}).call(this, this.angular);