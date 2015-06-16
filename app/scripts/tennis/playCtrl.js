(function (angular, _) {
    'use strict';

    angular.module('ScoreKeeper.Tennis')
	.controller('play', ['$scope', 'Fray', 'PointDetails', 'LocalStore', function ($s, fray, PointDetails, store) {

	    function refreshScoreProjection() {
	        $s.scoreProjection = fray.projectScore().now();
	    }

	    function persist() {
	        store.save();
	    }

	    function currentSet() {
	        /// <returns type="H.ScoreKeeper.ClashSet" />
	        return fray.clash().activeClash() || _.last(fray.clash().clashes);
	    }

	    function currentGame() {
	        /// <returns type="H.ScoreKeeper.Clash" />
	        var set = currentSet();
	        return set.activeClash() || _.last(set.clashes);
	    }

	    $s.pointDetails = {
	        current: new PointDetails(),
	        reasons: PointDetails.reason,
	        spins: PointDetails.spin,
	        handles: PointDetails.handle,
	        styles: PointDetails.style,
	        grabs: PointDetails.grab
	    };

	    $s.pointFor = function (party) {
	        currentGame().pointWith($s.pointDetails.current).for(party);
	        $s.pointDetails.current = new PointDetails();
	        refreshScoreProjection();
	        persist();
	    };
	    $s.undoPoint = function () {
	        currentGame().undoPoint();
	        refreshScoreProjection();
	        persist();
	    };

	    $s.closeGame = function () {
	        fray.clash().activeClash().activeClash().close($s.scoreProjection.currentSet.currentGame.winner);
	        refreshScoreProjection();
	        if ($s.scoreProjection.currentSet.isWon) {
	            fray.clash().activeClash().close();
	            refreshScoreProjection();
	            if ($s.scoreProjection.isWon) {
	                fray.stop();
	            }
	        }
	        persist();
	    };

	    $s.game = currentGame;
	    $s.scoreProjection = null;
	    refreshScoreProjection();

	}]);

}).call(this, this.angular, this._);