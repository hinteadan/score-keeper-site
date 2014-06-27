(function (angular) {
    'use strict';

    

    function GameProjector(clash) {
        /// <param name='clash' type='H.ScoreKeeper.Clash' />

        function projectCurrentState() {

        }

        this.now = projectCurrentState;
    }

    function Projector() {
        
    }

    angular.module('ScoreKeeper.Tennis')
    .value('Projector', Projector);

}).call(this, this.angular);