﻿(function (angular, _) {
	'use strict';

	var log = this.console.log;

	angular.module('ScoreKeeper.TableTennis')

		.controller('play', ['$scope', '$timeout', '$window', 'Clash', 'PointDetails', 'ClashLocalStore', 'ClashStateRouter', 'DataStore', 'eventSessionRestore', function ($scope, $t, $w, clash, PointDetails, clashStore, clashStateRouter, dataStore, restore) {
			/// <param name='clashStore' type='storage.LocalStore' />

		    if (clashStateRouter.goToCurrentClashState()) {
		        return;
		    }

		    function refreshScoreProjection() {
		    	$scope.scoreProjection = clash.projectScore().now();
		    }

		    $scope.$on(restore, refreshScoreProjection);

		    $scope.clash = function () {
		    	return clash.clashSet().activeClash() || _.last(clash.clashSet().clashes);
		    };
		    $scope.sets = clash.clashSet;
		    $scope.scoreProjection = null;
		    refreshScoreProjection();

			$scope.pointDetails = {
				current: new PointDetails(),
				reasons: PointDetails.reason,
				spins: PointDetails.spin,
				handles: PointDetails.handle
			};

			$scope.pointFor = function (party) {
				$scope.clash().pointWith($scope.pointDetails.current).for(party);
				$scope.pointDetails.current = new PointDetails();
				refreshScoreProjection();
				clashStore.save();
			};
			$scope.undoPoint = function () {
				$scope.clash().undoPoint();
				refreshScoreProjection();
				clashStore.save();
			};
			$scope.pointCreditPossibleMembers = function (scoringParty) {
			    var candidates = $scope.pointDetails.current.reason === PointDetails.reason.unforcedErrorByOpponent ?
					clash.theOtherParty(scoringParty).individuals :
					scoringParty.individuals;

			    if (candidates.length === 1) {
			        $scope.pointDetails.current.creditTo = candidates[0];
			    }

			    return candidates;
			};
			$scope.closeSet = function () {
			    $scope.clash().close($scope.scoreProjection.currentSet.winner);
				refreshScoreProjection();
				if ($scope.scoreProjection.isWon) {
					clash.stop();
				}
				clashStore.save();
			};
			$scope.commit = function () {

			    if (!$scope.commit.confirm) {
			        $scope.commit.confirm = true;
			        $t(function () {
			            delete $scope.commit.confirm;
			        }, 5000);
			        return;
			    }

			    delete $scope.commit.confirm;

			    clashStore.zap(clash);
			    clash.clashSet().close();
			    $scope.commit.committing = true;
			    dataStore.commit().then(function () {
			    	delete $scope.commit.committing;
			        $scope.commit.committed = true;
			    }, function (error) {
			    	delete $scope.commit.committing;
			        log(error);
			    });
                
			};
			$scope.restart = function () {
			    $w.location.reload();
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

}).call(this, this.angular, this._);