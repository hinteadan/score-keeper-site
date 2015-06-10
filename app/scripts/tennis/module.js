(function (angular) {
    'use strict';

    angular.module('ScoreKeeper.Tennis', ['ngRoute', 'ScoreKeeper.Common'])
	.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
			.when('/parties', { templateUrl: 'scripts/tennis/defineParties.tmpl.html', controller: 'defineParties' })
			.when('/clash', { templateUrl: 'scripts/tennis/defineClash.tmpl.html', controller: 'defineClash' })
            .when('/play', { templateUrl: 'scripts/tennis/play.tmpl.html', controller: 'play' })
			.otherwise({ redirectTo: '/parties' });
	}]);

}).call(this, this.angular);