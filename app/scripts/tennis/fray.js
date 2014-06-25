(function (angular, k) {
    'use strict';

    var gameTieMode = {
            advantageWin: 'AdvantageWin',
            singlePointWin: 'SinglePointWin'
        },
        setTieMode = {
            tieBreak: 'TieBreak',
            superTieBreak: 'SuperTieBreak',
            gameDifference: 'GameDifference'
        };

    function SetDetails() {
        this.firstToServe = null;
        this.firstToReceive = null;
        this.tieMode = setTieMode.tieBreak;
    }

    function FrayDetails() {
        this.firstToServe = null;
        this.firstToReceive = null;

        this.gamesPerSet = 6;
        this.setsToWin = 2;

        this.gameTieMode = gameTieMode.advantageWin;
        this.lastSetTieMode = setTieMode.tieBreak;

        this.createdOn = new Date();
        this.startedOn = null;
        this.endedOn = null;

        this.isValid = function () {
            return this.firstToServe && this.firstToReceive;
        };
        this.hasBegun = function () {
            return this.startedOn !== null;
        };
        this.hasEnded = function () {
            return this.endedOn !== null;
        };
    }

    angular.module('ScoreKeeper.Tennis')
	.service('Fray', [function () {
		var parties = [
				new k.Party(),
				new k.Party()
			],
			frayDetails = new FrayDetails();

		this.parties = parties;
		this.details = frayDetails;
	}]);

}).call(this, this.angular, this.H.ScoreKeeper);