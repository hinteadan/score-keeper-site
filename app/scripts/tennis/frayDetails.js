(function (angular) {
	'use strict';

	var gameTieMode = {
			advantageWin: 'AdvantageWin',
			noAdvantageWin: 'NoAdvantageWin'
		},
        setTieMode = {
        	tieBreak: 'TieBreak',
        	superTieBreak: 'SuperTieBreak',
        	gameDifference: 'GameDifference'
        };

	function GameDetails() {
	    this.serving = null;
	    this.receiving = null;
	    this.tieMode = gameTieMode.advantageWin;
	}

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
		this.setTieMode = setTieMode.tieBreak;
		this.decidingSetTieMode = setTieMode.tieBreak;

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
	.value('FrayDetails', FrayDetails)
	.value('SetDetails', SetDetails)
    .value('GameDetails', GameDetails)
	.value('GameTieModes', gameTieMode)
	.value('SetTieModes', setTieMode);

}).call(this, this.angular);