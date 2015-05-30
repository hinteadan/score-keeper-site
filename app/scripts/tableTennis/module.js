(function (angular) {
    'use strict';

    angular.module('ScoreKeeper.TableTennis', ['ngRoute', 'appConfig', 'ScoreKeeper.Common'])
	.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
			.when('/parties', { templateUrl: 'scripts/tableTennis/defineParties.tmpl.html', controller: 'defineParties' })
			.when('/clash', { templateUrl: 'scripts/tableTennis/defineClash.tmpl.html', controller: 'defineClash' })
			.when('/play', { templateUrl: 'scripts/tableTennis/play.tmpl.html', controller: 'play' })
			.when('/restore', { templateUrl: 'scripts/tableTennis/restore.tmpl.html', controller: 'restore' })
			.otherwise({ redirectTo: '/parties' });
	}])
    .run(['$rootScope', 'ClashStateRouter', function ($root, clashStateRouter) {
        $root.$on('$routeChangeStart', function ($ev) {
            if (clashStateRouter.goToCurrentClashState()) {
                $ev.preventDefault();
                return;
            }
        });
    }]);

}).call(this, this.angular);