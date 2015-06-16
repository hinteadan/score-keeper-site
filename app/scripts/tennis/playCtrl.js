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

	    $s.pointCreditPossibleMembers = function (scoringParty) {
	        var candidates =
                $s.pointDetails.current.reason === PointDetails.reason.unforcedErrorByOpponent ||
                $s.pointDetails.current.reason === PointDetails.reason.fault ?
                clash.theOtherParty(scoringParty).individuals :
                scoringParty.individuals;

	        if (candidates.length === 1) {
	            $s.pointDetails.current.creditTo = candidates[0];
	        }

	        return candidates;
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