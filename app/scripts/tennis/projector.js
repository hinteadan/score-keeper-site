(function (angular, _) {
    'use strict';

    var gameScore = ['0', '15', '30', '40'],
        gameScoreOnDifference = ['40', 'Ad', 'Wn'];

    function GameProjector(clash) {
        /// <param name='clash' type='H.ScoreKeeper.Clash' />

        function gameScoreFor(pointScore, otherPointScore) {
            var diff = pointScore - otherPointScore;

            if (clash.details.isTieBreaker) {
                return pointScore.toString();
            }

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
                scoreForFed = clash.scoreFor(fed),
                scoreForRafa = clash.scoreFor(rafa),
        		diff = scoreForFed - scoreForRafa,
                minPointsToWin = clash.details.isTieBreaker ? clash.details.tieBreakerMinPoints : 4,
                winnerProjector = {
                    AdvantageWin: projectWinnerOnAdvanatage,
                    NoAdvantageWin: projectWinnerOnNoAdvantage
                };

            if (scoreForFed < minPointsToWin && scoreForRafa < minPointsToWin) {
                return projection;
            }

            if (Math.abs(diff) > 2 && scoreForFed >= minPointsToWin && scoreForRafa >= minPointsToWin) {
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
    			minToWin = clash.details.gamesCount,
                scoreForFed = clash.scoreFor(fed),
    			scoreForRafa = clash.scoreFor(rafa),
                diff = Math.abs(scoreForFed - scoreForRafa),
                maxScore = Math.max(scoreForFed, scoreForRafa),
                possibleWinner = scoreForFed > scoreForRafa ? fed : rafa;

            if (scoreForFed < minToWin && scoreForRafa < minToWin) {
                return projection;
            }

            if (clash.details.tieMode === 'TieBreak' || clash.details.tieMode === 'SuperTieBreak') {
                if ((scoreForFed === minToWin + 1 || scoreForRafa === minToWin + 1) && diff === 1) {
                    projection.winner = possibleWinner;
                    projection.isWon = true;
                    return projection;
                }
            }

            if ((maxScore === minToWin && diff >= 2) || (maxScore === minToWin + 1 && diff === 2)) {
                projection.winner = possibleWinner;
                projection.isWon = true;
                return projection;
            }

            return projection;
        }

        function projectCurrentState() {
            var projection = new SetProjector.Projection(),
                fed = clash.parties[0],
                rafa = clash.parties[1],
                currentGame = clash.activeClash();
            projection.scorePerPartyName[fed.name] = clash.scoreFor(fed);
            projection.scorePerPartyName[rafa.name] = clash.scoreFor(rafa);

            projection = projectWinner(projection);

            projection.games = _.map(_.where(clash.clashes, function (c) { return c.hasEnded(); }), function (game) {
                return new GameProjector(game).now();
            });
            if (currentGame) {
                projection.currentGame = new GameProjector(currentGame).now();
            }

            return projection;
        }

        this.now = projectCurrentState;
    }
    SetProjector.Projection = function () {
        this.scorePerPartyName = {};
        this.isWon = false;
        this.winner = null;
        this.games = [];
        this.isTie = false;
        this.currentGame = null;
    };


    function Projector(clashSet) {
        /// <param name='clashSet' type='H.ScoreKeeper.ClashSet' />

        function projectWinner(projection) {
            var fed = clashSet.parties[0],
                rafa = clashSet.parties[1],
    			minToWin = clashSet.details.setsToWin;
            projection.winner = clashSet.scoreFor(fed) === minToWin ? fed : clashSet.scoreFor(rafa) === minToWin ? rafa : null;
            projection.isWon = projection.winner !== null;
            return projection;
        }

        function projectCurrentState() {
            var projection = new Projector.Projection(),
                fed = clashSet.parties[0],
                rafa = clashSet.parties[1],
                currentSet = clashSet.activeClash();
            projection.scorePerPartyName[fed.name] = clashSet.scoreFor(fed);
            projection.scorePerPartyName[rafa.name] = clashSet.scoreFor(rafa);

            projection = projectWinner(projection);

            projection.sets = _.map(_.where(clashSet.clashes, function (c) { return c.hasEnded(); }), function (set) {
                return new SetProjector(set).now();
            });
            if (currentSet) {
                projection.currentSet = new SetProjector(currentSet).now();
            }

            return projection;
        }

        this.now = projectCurrentState;

    }
    Projector.Projection = function () {
        this.scorePerPartyName = {};
        this.isWon = false;
        this.winner = null;
        this.sets = [];
        this.currentSet = null;
    };
    Projector.Game = GameProjector;
    Projector.Set = SetProjector;

    angular.module('ScoreKeeper.Tennis')
    .value('Projector', Projector);

}).call(this, this.angular, this._);