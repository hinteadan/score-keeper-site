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

	function ClashService(ScoreProjector) {
		var parties = [
				new k.Party('Team Awesome').addMembers([new k.Individual('Hintea', 'Dan'), new k.Individual('Pascalau', 'Anca')]),
				new k.Party('Team D&G').addMembers([new k.Individual('Pacurar', 'Georgiana'), new k.Individual('Mis', 'Diana Alina')])
		],
			clashDetails = new ClashDetails(11, parties[0].individuals[0], parties[1].individuals[0]),
			clash = null,
			projector = null;

		this.parties = parties;
		this.theOtherParty = function (currentParty) {
			return currentParty === parties[0] ? parties[1] : parties[0];
		};
		this.details = clashDetails;
		this.ClashDetails = ClashDetails;
		this.clash = function () {
			if (!clash) {
				clash = new k.Clash(parties, clashDetails);
			}
			this.skClash = clash;
			return clash;
		};
		this.projectScore = function () {
			if (!projector) {
				projector = new ScoreProjector(this.clash());
			}
			return projector;
		};

		this.restoreFromDto = function (dto) {
			return this;
		};
	}

	angular.module('ScoreKeeper.TableTennis')
		.service('Clash', ['ScoreProjector', ClashService]);

}).call(this, this.angular, this.H.ScoreKeeper);