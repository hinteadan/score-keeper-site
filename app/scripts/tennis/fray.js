(function (angular, k, _) {
    'use strict';

    angular.module('ScoreKeeper.Tennis')
	.service('Fray', ['FrayDetails', 'Projector', function (FrayDetails, Projector) {
	    var self = this,
            parties = [
				new k.Party('Fed'),
				new k.Party('Rafa')
            ],
            skClashSet = null,
            projector = null,
			frayDetails = new FrayDetails();

	    function ensureClashSet() {
	        if (skClashSet) {
	            return;
	        }

	        skClashSet = new k.ClashSet(
                    _.map(_.range(0, frayDetails.setsToWin * 2 - 1, 1), function (i) {
                        return new k.ClashSet(_.map(_.range(0, frayDetails.gamesPerSet * 2 + 1, 1), function (i) {
                            return new k.Clash(parties, frayDetails.defaultGameDetails(i === frayDetails.gamesPerSet * 2));
                        }), parties, frayDetails.defaultSetDetails());
                    }), parties, frayDetails);
	    }

	    function ensureScoreProjector() {
	        ensureClashSet();
	        if (projector) {
	            return;
	        }
	        projector = new Projector(skClashSet);
	    }

	    this.parties = parties;
	    this.details = frayDetails;
	    this.clash = function () {
	        ensureClashSet();
	        this.skClashSet = skClashSet;
	        return skClashSet;
	    };

	    this.projectScore = function () {
	        ensureScoreProjector();
	        return projector;
	    };

	    this.play = function () {
	        frayDetails.startedOn = new Date();
	    };
	    this.stop = function () {
	        frayDetails.endedOn = new Date();
	    };

	    this.revive = function (dto) {
	        return self;
	    };
	}]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);