(function (angular, confirm) {
	'use strict';

    angular.module('ScoreKeeper.TableTennis')
    .value('eventSessionRestore', 'clashSessionRestored')
	.controller('restore', ['$scope', '$location', '$rootScope', 'Clash', 'ClashLocalStore', 'ClashStateRouter', 'eventSessionRestore', function ($scope, $location, $rootScope, clash, clashStore, clashStateRouter, restoreEvent) {
		/// <param name='clashStore' type='storage.LocalStore' />

		$scope.any = clashStore.any;
		$scope.clashes = clashStore.query();
		$scope.restore = function (dto) {
			if (!confirm('Are you sure you want to restore the selected clash?')) {
				return;
			}
			clash.revive(dto);
			clashStore.replace(dto).with(clash);
			clashStateRouter.goToCurrentClashState();
			$rootScope.$broadcast(restoreEvent);
		};
		$scope.purgeAll = function () {
		    if (!confirm('Are you sure you want to permanently delete all the saved sessions?')) {
		        return;
		    }
		    clashStore.purge();
		};

	}]);

}).call(this, this.angular, this.confirm);