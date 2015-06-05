(function (angular, _) {
    'use strict';

    var log = this.console.log;

    angular.module('ScoreKeeper.TableTennis')

		.controller('play', ['$scope', '$timeout', '$window', 'Clash', 'PointDetails', 'ClashLocalStore', 'DataStore', 'eventSessionRestore', 'realtime', function ($scope, $t, $w, clash, PointDetails, clashStore, dataStore, restore, realtime) {

		    /// <var type="H.DataStore.Realtime.Api" />
		    var realtimeApi = null;

		    realtime.bind().then(function (api) {
		        /// <param name="api" type="H.DataStore.Realtime.Api" />
		        realtimeApi = api;
		    });

		    function refreshScoreProjection() {
		        $scope.scoreProjection = clash.projectScore().now();
		    }

		    function persist() {
		        dataStore.persist().then(clashStore.save);
		        if (realtimeApi) {
		            realtimeApi.announceEntityChange({ Id: clash.persistence.id, Data: clash.projectScore().now() });
		        }
		    }

		    $scope.$on(restore, refreshScoreProjection);
		    dataStore.persist.onStatusChange(function (status) {
		        $t(function () {
		            $scope.netStat = status;
		        });
		    });
		    $scope.netStat = dataStore.persist.status();

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
		        handles: PointDetails.handle,
		        styles: PointDetails.style,
		        grabs: PointDetails.grab
		    };

		    $scope.pointFor = function (party) {
		        $scope.clash().pointWith($scope.pointDetails.current).for(party);
		        $scope.pointDetails.current = new PointDetails();
		        refreshScoreProjection();
		        persist();
		    };
		    $scope.undoPoint = function () {
		        $scope.clash().undoPoint();
		        refreshScoreProjection();
		        persist();
		    };
		    $scope.pointCreditPossibleMembers = function (scoringParty) {
		        var candidates =
                    $scope.pointDetails.current.reason === PointDetails.reason.unforcedErrorByOpponent ||
                    $scope.pointDetails.current.reason === PointDetails.reason.fault ?
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
		        persist();
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

		            case PointDetails.style.downTheLine: return 'Dn.Th.Ln.';
		            case PointDetails.style.insideOut: return 'InOut';

		            default: return input;
		        }
		    };
		}]);

}).call(this, this.angular, this._);