(function (angular, k, _) {
	'use strict';

	var inject = angular.injector(['ScoreKeeper.TableTennis', 'ngRoute']),
		ScoreProjector = inject.get('ScoreProjector'),
		clashService = inject.get('Clash'),
		parties = null,
		clash = null,
		projector = null;

	function projectionOk(scoreA, scoreB, serving, receiving) {
		var p = projector.now();
		ok(p.scorePerPartyName[clash.parties[0].name] === scoreA, 'Team 1 score is not correct');
		ok(p.scorePerPartyName[clash.parties[1].name] === scoreB, 'Team 2 score is not correct');
		ok(p.serving === serving, 'Person to serve is not correct @ ' + scoreA + ' / ' + scoreB);
		ok(p.receiving === receiving, 'Person to receive is not correct @ ' + scoreA + ' / ' + scoreB);
	}

	function score(n) {
		var n = n || 1;
		return {
			for: function (party) {
				for (var i = 0; i < n; i++) {
					clash.pointFor(party);
				}
			}
		};
	}

	module('Table Tennis');
	test('AngularJS Injections', function () {
		ok(angular.isFunction(ScoreProjector), 'We don\'t have the ScoreProjector class');
		ok(angular.isObject(clashService), 'We don\'t have the clash service');
	});

	module('Table Tennis - Doubles', {
		setup: function () {
			parties = [
				new k.Party('Team Awesome').addMembers([new k.Individual('Hintea', 'Dan'), new k.Individual('Pascalau', 'Anca')]),
				new k.Party('Team D&G').addMembers([new k.Individual('Pacurar', 'Georgiana'), new k.Individual('Mis', 'Diana Alina')])
			];
			clash = new k.Clash(parties, new clashService.ClashDetails(11, parties[0].individuals[0], parties[1].individuals[0]));
			projector = new ScoreProjector(clash);
		},
		teardown: function () { }
	});

	test('AngularJS Injections', function () {
		ok(angular.isObject(clash), 'We don\'t have the clash instance');
		ok(angular.isObject(projector), 'We don\'t have the projector instance');
	});

	test('Initial projection', function () {
		projectionOk(0, 0, parties[0].individuals[0], parties[1].individuals[0]);
	});

	test('1 point is scored', function () {
		clash.pointFor(clash.parties[0]);
		projectionOk(1, 0, parties[0].individuals[0], parties[1].individuals[1]);
	});

	test('4 points are scored', function () {
		score(3).for(clash.parties[0]);
		score(1).for(clash.parties[1]);

		projectionOk(3, 1, parties[0].individuals[0], parties[1].individuals[0]);
	});

	test('5 points are scored', function () {
		score(3).for(clash.parties[0]);
		score(2).for(clash.parties[1]);

		projectionOk(3, 2, parties[1].individuals[0], parties[0].individuals[1]);
	});

	test('10 points are scored', function () {
		score(6).for(clash.parties[0]);
		score(4).for(clash.parties[1]);

		projectionOk(6, 4, parties[0].individuals[1], parties[1].individuals[1]);
	});

	test('Tiebreak', function () {
		score(10).for(clash.parties[0]);
		score(10).for(clash.parties[1]);
		projectionOk(10, 10, parties[0].individuals[0], parties[1].individuals[0]);
		score().for(clash.parties[0]);
		projectionOk(11, 10, parties[1].individuals[0], parties[0].individuals[1]);
		score().for(clash.parties[1]);
		projectionOk(11, 11, parties[0].individuals[1], parties[1].individuals[1]);
		score().for(clash.parties[1]);
		projectionOk(11, 12, parties[1].individuals[1], parties[0].individuals[0]);
		score().for(clash.parties[1]);
		projectionOk(11, 13, parties[0].individuals[0], parties[1].individuals[0]);
	});

}).call(this, this.angular, this.H.ScoreKeeper, this._);
