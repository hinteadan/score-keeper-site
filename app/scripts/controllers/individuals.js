(function(angular, Individual, undefined){

	'use strict';

	angular.module('scoreKeeperSiteApp')
	.controller('IndividualsCtrl', ['$scope', function ($scope) {

		var individuals = [new Individual('Dan', 'Hintea')];

		function addIndividualNamed(firstName, lastName){
			if(!lastName){
				return;
			}
			individuals.push(new Individual(firstName, lastName));
		}

		$scope.people = function(){ return individuals; };
		$scope.add = addIndividualNamed;

	}]);

}).call(this, this.angular, this.H.ScoreKeeper.Individual);