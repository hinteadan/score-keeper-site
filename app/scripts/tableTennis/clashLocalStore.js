(function (angular, LocalStore) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
	.factory('ClashLocalStore', [function () {
		return new LocalStore('ScoreKeeper.TableTennis.Clash.4303D7B8-A12F-43EC-920C-898A701D881D');
	}]);

}).call(this, this.angular, this.storage.LocalStore);