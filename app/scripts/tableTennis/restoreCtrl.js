(function (angular) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
	.controller('restore', ['$scope', 'Clash', 'ClashLocalStore', function ($scope, clash, clashStore) {
		/// <param name='clashStore' type='storage.LocalStore' />

		$scope.any = clashStore.any;
		$scope.clashes = clashStore.query();

	}]);

}).call(this, this.angular);