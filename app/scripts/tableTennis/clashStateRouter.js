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
	        var isRedirect = false;
	        if (_.any(clash.parties, isPartyNamelessOrEmpty)) {
	            isRedirect = $location.path() !== '/parties';
	            $location.path('/parties');
	        }
	        else if (!clash.details.isValid() || !clash.details.hasBegun()) {
	            isRedirect = $location.path() !== '/clash';
	            $location.path('/clash');
	        }
	        else if (clash.details.hasBegun()) {
	            isRedirect = $location.path() !== '/play';
	            $location.path('/play');
	        }
	        return isRedirect;
	    }

	    this.goToCurrentClashState = goToCurrentClashState;
        
	}]);

}).call(this, this.angular, this._);