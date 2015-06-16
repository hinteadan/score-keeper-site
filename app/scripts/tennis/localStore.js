(function (angular, LocalStore) {
    'use strict';

    angular.module('ScoreKeeper.Tennis')
	.factory('LocalStore', [function () {
	    return new LocalStore('ScoreKeeper.Tennis.Fray.8A6E3600-0803-4882-AE25-50CA0F77C8FB');
	}]);

}).call(this, this.angular, this.storage.LocalStore);