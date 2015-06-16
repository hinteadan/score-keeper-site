(function (angular, confirm) {
    'use strict';

    angular.module('ScoreKeeper.Tennis')
    .value('eventSessionRestore', 'tennisFraySessionRestored')
	.controller('restore', ['$scope', '$location', '$rootScope', '$q', 'Fray', 'LocalStore', 'eventSessionRestore', function ($s, $location, $root, $q, fray, store, restoreEvent) {

	    $s.any = store.any;
	    $s.clashes = store.query();
	    $s.restore = function (dto) {
	        if (!confirm('Are you sure you want to restore the selected tennis match ?')) {
	            return;
	        }
	        fray.revive(dto);
	        store.replace(dto).with(fray);
	        $root.$broadcast(restoreEvent);
	    };
	    $s.purgeAll = function () {
	        if (!confirm('Are you sure you want to permanently delete all the saved sessions?')) {
	            return;
	        }
	        //var zapPromises = [];
	        //angular.forEach(store.query(), function (clash) {
	        //    if (!clash.persistence || !clash.persistence.id) {
	        //        return;
	        //    }
	        //    zapPromises.push(dataStore.zap(clash.persistence.id));
	        //});
	        //$q.all(zapPromises).finally(clashStore.purge);
	        store.purge();
	    };

	}]);

}).call(this, this.angular, this.confirm);