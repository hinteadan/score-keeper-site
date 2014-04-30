'use strict';

angular
    .module('scoreKeeperSiteApp', ['ngRoute', 'defineTournament'])
    .config(['$routeProvider', 'tournamentWizardProvider', function ($routeProvider, tournamentWizard) {
        $routeProvider
            .when('/define/tournament', { templateUrl: tournamentWizard.view(), controller: tournamentWizard.controller() })
            .when('/define/tournament/:id', { templateUrl: tournamentWizard.view(), controller: tournamentWizard.controller() })
            .otherwise({ redirectTo: '/define/tournament' });
    }]);
