'use strict';

angular
    .module('scoreKeeperSiteApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/step1', { templateUrl: 'views/individuals.tmpl.html', controller: 'IndividualsCtrl' })
            .when('/step2', { templateUrl: 'views/teams.tmpl.html', controller: 'TeamsCtrl' })
            .when('/step3', { templateUrl: 'views/tournament.tmpl.html', controller: 'TournamentCtrl' })
            .otherwise({ redirectTo: '/step1' });
    }]);
