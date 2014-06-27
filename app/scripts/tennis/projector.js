(function (angular, _) {
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

        function projectCurrentState() {
            var projection = new GameProjector.Projection(),
                fed = clash.parties[0],
                rafa = clash.parties[1];
            projection.scorePerPartyName[fed.name] = gameScoreFor(clash.scoreFor(fed), clash.scoreFor(rafa));
            projection.scorePerPartyName[rafa.name] = gameScoreFor(clash.scoreFor(rafa), clash.scoreFor(fed));
            
            return projection;
        }

        this.now = projectCurrentState;
    }
    GameProjector.Projection = function () {
        this.scorePerPartyName = {};
        this.deuceCount = 0;
        this.isWon = false;
        this.winner = null;
    };


    function Projector() {
        
    }
    Projector.Game = GameProjector;

    angular.module('ScoreKeeper.Tennis')
    .value('Projector', Projector);

}).call(this, this.angular, this._);