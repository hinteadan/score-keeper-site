(function(angular){
	'use strict';

	angular.module('ScoreKeeper.TableTennis', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
            .when('/parties', { templateUrl: 'scripts/tableTennis/defineParties.tmpl.html', controller: 'defineParties' })
			.when('/clash', { templateUrl: 'scripts/tableTennis/defineClash.tmpl.html', controller: 'defineClash' })
            .otherwise({ redirectTo: '/parties' });
	}]);


}).call(this, this.angular);