(function (angular, confirm, _) {
	'use strict';

    angular.module('ScoreKeeper.TableTennis')
    .value('eventSessionRestore', 'clashSessionRestored')
	.controller('restore', ['$scope', '$location', '$rootScope', 'Clash', 'ClashLocalStore', 'eventSessionRestore', function ($scope, $location, $rootScope, clash, clashStore, restoreEvent) {
		/// <param name='clashStore' type='storage.LocalStore' />

	    function isPartyNameless(p) {
	        return p.name.replace(/\s/gi, '') === '' ? true : false;
	    }

	    function isPartyEmpty(p) {
	        return p.individuals.length === 0;
	    }

	    function isPartyNamelessOrEmpty(p) {
	        return isPartyNameless(p) || isPartyEmpty(p);
	    }

	    function goToCurrentClashState() {
	        if (_.any(clash.parties, isPartyNamelessOrEmpty)) {
	            $location.path('/parties');
	            return;
	        }
	        if (!clash.details.isValid() || !clash.details.hasBegun()) {
	            $location.path('/clash');
	            return;
	        }
	        if (!clash.details.hasEnded()) {
	            $location.path('/play');
	            return;
	        }
	    }

		$scope.any = clashStore.any;
		$scope.clashes = clashStore.query();
		$scope.restore = function (dto) {
			if (!confirm('Are you sure you want to restore the selected clash?')) {
				return;
			}
			clash.revive(dto);
			clashStore.replace(dto).with(clash);
			goToCurrentClashState();
			$rootScope.$broadcast(restoreEvent);
		};
		$scope.purgeAll = function () {
		    if (!confirm('Are you sure you want to permanently delete all the saved sessions?')) {
		        return;
		    }
		    clashStore.purge();
		};

	}]);

}).call(this, this.angular, this.confirm, this._);