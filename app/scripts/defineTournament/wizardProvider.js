(function (angular) {
    'use strict';



    angular.module('defineTournament')
    .provider('tournamentWizard', [function () {

        this.view = function () { return 'scripts/defineTournament/participantsView.tmpl.html'; };
        this.controller = function () { return 'Participants'; };

        this.$get = [function () {
            return {

            };
        }];
    }]);

}).call(this, this.angular);