(function (angular, k) {
	'use strict';

	function ClashDetails(pointsToWin, firstToServe, firstToReceive) {
		this.pointsToWin = pointsToWin || 21;
		this.firstToServe = firstToServe;
		this.firstToReceive = firstToReceive;
		this.serveChangeAfter = 5;
		this.isValid = function () {
			return this.firstToServe && this.firstToReceive;
		};
	}

	angular.module('ScoreKeeper.TableTennis')
	.service('Clash', [function () {
		var parties = [
				new k.Party('Team Awesome').addMembers([new k.Individual('Hintea', 'Dan'), new k.Individual('Pascalau', 'Anca')]),
				new k.Party('Team D&G').addMembers([new k.Individual('Pacurar', 'Georgiana'), new k.Individual('Mis', 'Diana Alina')])
			],
			clashDetails = new ClashDetails(10, parties[0].individuals[0], parties[1].individuals[0]),
			clash = null;

		this.parties = parties;
		this.details = clashDetails;
		this.ClashDetails = ClashDetails;
		this.clash = function () {
			if (!clash) {
				clash = new k.Clash(parties, clashDetails);
			}
			return clash;
		};
	}]);

}).call(this, this.angular, this.H.ScoreKeeper);