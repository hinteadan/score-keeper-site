(function (angular, _) {
    'use strict';

    angular.module('ScoreKeeper.Tennis')
	.controller('play', ['$scope', 'Fray', 'PointDetails', function ($s, fray, PointDetails) {

	    function refreshScoreProjection() {
	        $s.scoreProjection = fray.projectScore().now();
	    }

	    function persist() {

	    }

	    function currentSet() {
	        /// <returns type="H.ScoreKeeper.ClashSet" />
	        return _.first(fray.clash().activeClash()) || _.last(fray.clash().clashes);
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

	    $s.game = currentGame;
	    $s.scoreProjection = null;
	    refreshScoreProjection();

	}]);

}).call(this, this.angular, this._);