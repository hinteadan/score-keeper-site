(function (angular) {
    'use strict';

    var gameScore = ['0', '15', '30', '40'],
        gameScoreOnDifference = ['40', 'Ad', 'Wn'];

    function GameProjector(clash) {
        /// <param name='clash' type='H.ScoreKeeper.Clash' />

        function gameScoreFor(pointScore, otherPointScore) {
            var diff = pointScore - otherPointScore;
            if (pointScore < 3) {
                return gameScore[pointScore];
            }
            else if (pointScore === 3) {
                return diff < 0 ? '-' : gameScore[pointScore];
            }
            return diff < 0 ? '-' : gameScoreOnDifference[diff];
        }

        function projectWinnerOnAdvanatage(projection, fed, rafa, diff) {
        	/// <param name='projection' type='GameProjector.Projection' />
        	projection.winner = diff >= 2 ? fed : diff <= -2 ? rafa : null;
        	projection.isWon = projection.winner !== null;
        	return projection;
        }

        function projectWinnerOnNoAdvantage(projection, fed, rafa, diff) {
        	/// <param name='projection' type='GameProjector.Projection' />
        	projection.winner = diff >= 1 ? fed : diff <= -1 ? rafa : null;
        	projection.isWon = projection.winner !== null;
        	return projection;
        }

        function projectWinner(projection) {
        	/// <param name='projection' type='GameProjector.Projection' />
        	var fed = clash.parties[0],
                rafa = clash.parties[1],
        		diff = clash.scoreFor(fed) - clash.scoreFor(rafa),
                winnerProjector = {
                	AdvantageWin: projectWinnerOnAdvanatage,
                	NoAdvantageWin: projectWinnerOnNoAdvantage
                };

        	if (clash.scoreFor(fed) < 4 && clash.scoreFor(rafa) < 4) {
        		return projection;
        	}

        	if (Math.abs(diff) > 2 && clash.scoreFor(fed) >= 4 && clash.scoreFor(rafa) >= 4) {
        		throw new Error('The point advantage must not be greater than two!');
        	}

        	return winnerProjector[clash.details.tieMode](projection, fed, rafa, diff);
        }

        function projectCurrentState() {
            var projection = new GameProjector.Projection(),
                fed = clash.parties[0],
                rafa = clash.parties[1];
            projection.scorePerPartyName[fed.name] = gameScoreFor(clash.scoreFor(fed), clash.scoreFor(rafa));
            projection.scorePerPartyName[rafa.name] = gameScoreFor(clash.scoreFor(rafa), clash.scoreFor(fed));
            projection.deuceCount = Math.min(clash.scoreFor(fed), clash.scoreFor(rafa)) - 2;
            if (projection.deuceCount < 0) { projection.deuceCount = 0; }
            projection.isTied = projection.deuceCount > 0;

            return projectWinner(projection);
        }

        this.now = projectCurrentState;
    }
    GameProjector.Projection = function () {
        this.scorePerPartyName = {};
        this.deuceCount = 0;
        this.isTied = false;
        this.isWon = false;
        this.winner = null;
    };

    function SetProjector(clash) {
    	/// <param name='clash' type='H.ScoreKeeper.ClashSet' />

    	function projectWinner(projection) {
    		var fed = clash.parties[0],
                rafa = clash.parties[1],
    			minToWin = clash.details.gamesCount;
    		projection.winner = clash.scoreFor(fed) === minToWin ? fed : clash.scoreFor(rafa) === minToWin ? rafa : null;
    		projection.isWon = projection.winner !== null;
    		return projection;
    	}

    	function projectCurrentState() {
    		var projection = new SetProjector.Projection(),
                fed = clash.parties[0],
                rafa = clash.parties[1];
    		projection.scorePerPartyName[fed.name] = clash.scoreFor(fed);
    		projection.scorePerPartyName[rafa.name] = clash.scoreFor(rafa);

    		return projectWinner(projection);
    	}

    	this.now = projectCurrentState;
    }
    SetProjector.Projection = function () {
    	this.scorePerPartyName = {};
    	this.isWon = false;
    	this.winner = null;
    };


    function Projector() {

    }
    Projector.Game = GameProjector;
    Projector.Set = SetProjector;

    angular.module('ScoreKeeper.Tennis')
    .value('Projector', Projector);

}).call(this, this.angular);