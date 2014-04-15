(function (angular, _, sk, wizard, undefined) {

	'use strict';

	angular.module('scoreKeeperSiteApp')
	.controller('TournamentCtrl', ['$scope', '$location', function ($scope, $location) {

		if (wizard.isAtStart()) {
			$location.path('/');
			return;
		}

		var dummyChampionship = wizard.currentStep().tournament();

		function htmlEntities(htmlString) {
			return htmlString.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}

		function mapTeam(team) {
			return {
				name: htmlEntities(team.name),
				id: htmlEntities(team.name)
			};
		}

		function mapClash(clash) {
			return _.map(clash.parties(), mapTeam);
		}

		function mapRounds(rounds) {
			return _.map(rounds, function (r) { return _.map(r, mapClash); });
		}

		$scope.gracketOptions = {
			src: mapRounds(dummyChampionship.rounds())
			// src: [
			//          [
			//            [ {'name' : 'Erik Zettersten', 'id' : 'erik-zettersten', 'seed' : 1}, {'name' : 'Andrew Miller', 'id' : 'andrew-miller', 'seed' : 2} ],
			//            [ {'name' : 'James Coutry', 'id' : 'james-coutry', 'seed' : 3}, {'name' : 'Sam Merrill', 'id' : 'sam-merrill', 'seed' : 4}],
			//            [ {'name' : 'Anothy Hopkins', 'id' : 'anthony-hopkins', 'seed' : 5}, {'name' : 'Everett Zettersten', 'id' : 'everett-zettersten', 'seed' : 6} ],
			//            [ {'name' : 'John Scott', 'id' : 'john-scott', 'seed' : 7}, {'name' : 'Teddy Koufus', 'id' : 'teddy-koufus', 'seed' : 8}],
			//            [ {'name' : 'Arnold Palmer', 'id' : 'arnold-palmer', 'seed' : 9}, {'name' : 'Ryan Anderson', 'id' : 'ryan-anderson', 'seed' : 10} ],
			//            [ {'name' : 'Jesse James', 'id' : 'jesse-james', 'seed' : 1}, {'name' : 'Scott Anderson', 'id' : 'scott-anderson', 'seed' : 12}],
			//            [ {'name' : 'Josh Groben', 'id' : 'josh-groben', 'seed' : 13}, {'name' : 'Sammy Zettersten', 'id' : 'sammy-zettersten', 'seed' : 14} ],
			//            [ {'name' : 'Jake Coutry', 'id' : 'jake-coutry', 'seed' : 15}, {'name' : 'Spencer Zettersten', 'id' : 'spencer-zettersten', 'seed' : 16}]
			//          ], 
			//          [
			//            [ {'name' : 'Erik Zettersten', 'id' : 'erik-zettersten', 'seed' : 1}, {'name' : 'James Coutry', 'id' : 'james-coutry', 'seed' : 3} ],
			//            [ {'name' : 'Anothy Hopkins', 'id' : 'anthony-hopkins', 'seed' : 5}, {'name' : 'Teddy Koufus', 'id' : 'teddy-koufus', 'seed' : 8} ],
			//            [ {'name' : 'Ryan Anderson', 'id' : 'ryan-anderson', 'seed' : 10}, {'name' : 'Scott Anderson', 'id' : 'scott-anderson', 'seed' : 12} ],
			//            [ {'name' : 'Sammy Zettersten', 'id' : 'sammy-zettersten', 'seed' : 14}, {'name' : 'Jake Coutry', 'id' : 'jake-coutry', 'seed' : 15} ]
			//          ],
			//          [
			//            [ {'name' : 'Erik Zettersten', 'id' : 'erik-zettersten', 'seed' : 1}, {'name' : 'Anothy Hopkins', 'id' : 'anthony-hopkins', 'seed' : 5} ],
			//            [ {'name' : 'Ryan Anderson', 'id' : 'ryan-anderson', 'seed' : 10}, {'name' : 'Sammy Zettersten', 'id' : 'sammy-zettersten', 'seed' : 14} ]
			//          ],
			//          [
			//            [ {'name' : 'Erik Zettersten', 'id' : 'erik-zettersten', 'seed' : 1}, {'name' : 'Ryan Anderson', 'id' : 'ryan-anderson', 'seed' : 10} ]
			//          ],
			//          [
			//            [ {'name' : 'Erik Zettersten', 'id' : 'erik-zettersten', 'seed' : 1} ]
			//          ]
			//        ]
		};
	}]);

}).call(this, this.angular, this._, this.H.ScoreKeeper, this.TournamentWizardService);