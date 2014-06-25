(function (angular) {
    'use strict';

    angular.module('ScoreKeeper.Tennis', ['ngRoute', 'ScoreKeeper.Common'])
	.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
			.when('/parties', { templateUrl: 'scripts/tennis/defineParties.tmpl.html', controller: 'defineParties' })
			.otherwise({ redirectTo: '/parties' });
	}]);

}).call(this, this.angular);