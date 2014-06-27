(function (angular, _) {
    'use strict';

    

    function GameProjector(clash) {
        /// <param name='clash' type='H.ScoreKeeper.Clash' />

        function projectCurrentState() {
            var projection = new GameProjector.Projection();
            _.each(clash.parties, function (p) {
                projection.scorePerPartyName[p.name] = '0';
            });
            return projection;
        }

        this.now = projectCurrentState;
    }
    GameProjector.Projection = function () {
        this.scorePerPartyName = {};
        this.serving = null;
        this.receiving = null;
        this.isWon = false;
        this.winner = null;
    };


    function Projector() {
        
    }
    Projector.Game = GameProjector;

    angular.module('ScoreKeeper.Tennis')
    .value('Projector', Projector);

}).call(this, this.angular, this._);