(function(angular, Individual, Team, sks, undefined){

	'use strict';

	angular.module('scoreKeeperSiteApp')
	.controller('TeamsCtrl', ['$scope', function ($scope) {

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
		    ],
	        teams = [];

		function generateRandomTeamsOf(memberCount) {
		    teams = new sks.RandomPartiesGenerator(individuals).partiesOf(memberCount);
		}

		function generateEmptyTeamsOf(memberCount) {
		    var teamCount = Math.ceil(individuals.length / memberCount);
		    teams = [];
		    for (var i = 1; i <= teamCount; i++) {
		        teams.push(new Team("Team " + i));
		    }
		}

		$scope.people = function () { return individuals; };
		$scope.teams = function () { return teams; };
		$scope.randomOf = generateRandomTeamsOf;
		$scope.emptyOf = generateEmptyTeamsOf;

	}]);

}).call(this, this.angular, this.H.ScoreKeeper.Individual, this.H.ScoreKeeper.Party, this.H.ScoreKeeper.Sattelites);