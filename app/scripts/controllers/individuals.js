(function(angular, Individual, undefined){

	'use strict';

	angular.module('scoreKeeperSiteApp')
	.controller('IndividualsCtrl', ['$scope', function ($scope) {

		var individuals = [
			new Individual('Dan', 'Hintea'),
			new Individual('Roger', 'Federer'),
			new Individual('Rafael', 'Nadal'),
			new Individual('Stanislas', 'Wawrinka'),
			new Individual('Novak', 'Djokovic'),
			new Individual('Eugenie', 'Bouchard'),
			new Individual('Caroline', 'Wozniaki'),
			new Individual('Maria', 'Sharapova'),
			new Individual('Serena', 'Williams'),
			new Individual('Andy', 'Murray')
			];

		function addIndividualNamed(firstName, lastName){
			if(!lastName){
				return;
			}
			individuals.push(new Individual(firstName, lastName));
		}

		function removeIndividual(person){
			var index = individuals.indexOf(person);
			if(index < 0){
				return;
			}
			individuals.splice(index, 1);
		}

		$scope.people = function(){ return individuals; };
		$scope.add = addIndividualNamed;
		$scope.remove = removeIndividual;

	}]);

}).call(this, this.angular, this.H.ScoreKeeper.Individual);