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

        this.set = function (property, value) {
            self[property] = value;
            return self;
        };
    }

    function SetDetails() {
        var self = this;
        this.firstToServe = null;
        this.firstToReceive = null;
        this.tieMode = setTieMode.tieBreak;
        this.gamesCount = 6;

        this.set = function (property, value) {
            self[property] = value;
            return self;
        };
    }

    function FrayDetails() {
        var self = this;

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
        this.defaultSetDetails = function () {
            return new SetDetails()
            .set('firstToServe', self.firstToServe)
            .set('firstToReceive', self.firstToReceive)
            .set('tieMode', self.setTieMode)
            .set('gamesCount', self.gamesPerSet)
            .set('gameTieMode', self.gameTieMode);
        };
        this.defaultGameDetails = function () {
            return new GameDetails()
            .set('tieMode', self.gameTieMode);
        };
    }

    angular.module('ScoreKeeper.Tennis')
	.value('FrayDetails', FrayDetails)
	.value('SetDetails', SetDetails)
    .value('GameDetails', GameDetails)
	.value('GameTieModes', gameTieMode)
	.value('SetTieModes', setTieMode);

}).call(this, this.angular);