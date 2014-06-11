(function (angular) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')

		.controller('restore', ['$scope', '$window', 'Clash', 'ClashLocalStore', function ($scope, $window, clash, clashStore) {
			/// <param name='clashStore' type='storage.LocalStore' />

			if (!clashStore.any()) {
				$window.location.href = $window.location.href.substr(0, $window.location.href.indexOf('#'));
			}



		}]);

}).call(this, this.angular);