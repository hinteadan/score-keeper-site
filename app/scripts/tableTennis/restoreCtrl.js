﻿(function (angular, confirm) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
	.controller('restore', ['$scope', 'Clash', 'ClashLocalStore', function ($scope, clash, clashStore) {
		/// <param name='clashStore' type='storage.LocalStore' />

		$scope.any = clashStore.any;
		$scope.clashes = clashStore.query();
		$scope.restore = function (dto) {
			if (!confirm('Are you sure you want to restore the selected clash?')) {
				return;
			}
			clash.restoreFromDto(dto);
			clashStore.zap(dto);
			clashStore.add(clash);
		};

	}]);

}).call(this, this.angular, this.confirm);