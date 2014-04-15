(function (angular, Individual, Team, sks, _, wizard, undefined) {

    'use strict';

    function IndividualViewData() {
        this.team = null;
    }

    angular.module('scoreKeeperSiteApp')
	.controller('TeamsCtrl', ['$scope', '$location', function ($scope, $location) {

		if (wizard.isAtStart()) {
			$location.path('/');
		}

	    var individuals = wizard.currentStep().participants(),
			teams = wizard.currentStep().teams;

	    function resetIndividualsAssignedTeam() {
	        _.each(individuals, function (i) { i.viewData.team = null; });
	    }

	    function generateRandomTeamsOf(memberCount) {
	    	wizard.currentStep().clear().teams(new sks.RandomPartiesGenerator(individuals).partiesOf(memberCount));
	        _.each(teams(), function (t) {
	            _.each(t.individuals(), function (i) {
	                i.viewData.team = t;
	            });
	        });
	    }

	    function generateEmptyTeamsOf(memberCount) {
	        var teamCount = Math.ceil(individuals.length / memberCount);
	        wizard.currentStep().clear();
	        for (var i = 1; i <= teamCount; i++) {
	            teams().push(new Team('Team ' + i));
	        }
	        resetIndividualsAssignedTeam();
	    }

	    function extendIndividualWithViewData(individual) {
	        individual.viewData = new IndividualViewData();
	    }

	    function initialize() {
	        _.each(individuals, extendIndividualWithViewData);
	    }

	    function removeIndividualFromTeam(individual) {
	        if (!individual.viewData.team) {
	            return;
	        }
	        individual.viewData.team.zapMember(individual);
	        individual.viewData.team = null;
	    }

	    function addIndividualToTeam(individual, team) {
	        if (individual.viewData.team === team) {
	            return;
	        }
	        removeIndividualFromTeam(individual);
	        team.addMember(individual);
	        individual.viewData.team = team;
	    }

	    $scope.people = function () { return individuals; };
	    $scope.teams = teams;
	    $scope.randomOf = generateRandomTeamsOf;
	    $scope.emptyOf = generateEmptyTeamsOf;
	    $scope.unteam = removeIndividualFromTeam;
	    $scope.team = addIndividualToTeam;
	    initialize();
	}]);

}).call(this, this.angular, this.H.ScoreKeeper.Individual, this.H.ScoreKeeper.Party, this.H.ScoreKeeper.Sattelites, this._, this.TournamentWizardService);