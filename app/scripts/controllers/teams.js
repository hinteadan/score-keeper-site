(function(angular, Individual, Team, sks, _, undefined){

	'use strict';

	function IndividualViewData(){
		this.team = null;
	}

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

        function resetIndividualsAssignedTeam(){
        	_.each(individuals, function(i){ i.viewData.team = null; });
        }

		function generateRandomTeamsOf(memberCount) {
		    teams = new sks.RandomPartiesGenerator(individuals).partiesOf(memberCount);
		    _.each(teams, function(t){
	    		_.each(t.individuals(), function(i){
	    			i.viewData.team = t;
	    		});
		    });
		}

		function generateEmptyTeamsOf(memberCount) {
		    var teamCount = Math.ceil(individuals.length / memberCount);
		    teams = [];
		    for (var i = 1; i <= teamCount; i++) {
		        teams.push(new Team('Team ' + i));
		    }
		    resetIndividualsAssignedTeam();
		}

		function extendIndividualWithViewData(individual){
			individual.viewData = new IndividualViewData();
		}

		function initialize(){
			_.each(individuals, extendIndividualWithViewData);
		}

		$scope.people = function () { return individuals; };
		$scope.teams = function () { return teams; };
		$scope.randomOf = generateRandomTeamsOf;
		$scope.emptyOf = generateEmptyTeamsOf;
		initialize();
	}]);

}).call(this, this.angular, this.H.ScoreKeeper.Individual, this.H.ScoreKeeper.Party, this.H.ScoreKeeper.Sattelites, this._);