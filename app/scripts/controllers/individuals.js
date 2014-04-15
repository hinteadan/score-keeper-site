(function(angular, Individual, wizard, undefined){

	'use strict';

	angular.module('scoreKeeperSiteApp')
	.controller('IndividualsCtrl', ['$scope', '$location', function ($scope, $location) {

	    var individuals = wizard.currentStep().participants();

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
		$scope.next = function () {
		    wizard.next();
		    $location.path('/step2');
		};

	}]);

}).call(this, this.angular, this.H.ScoreKeeper.Individual, this.TournamentWizardService);