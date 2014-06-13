(function (angular, _) {
    'use strict';

    angular.module('ScoreKeeper.TableTennis')
	.service('ClashStateRouter', ['$location', 'Clash', function ($location, clash) {

	    function isPartyNameless(p) {
	        return !p.name || p.name.replace(/\s/gi, '') === '' ? true : false;
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

	    this.goToCurrentClashState = goToCurrentClashState;
        
	}]);

}).call(this, this.angular, this._);