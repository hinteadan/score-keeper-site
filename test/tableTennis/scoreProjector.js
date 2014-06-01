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
		ok(p.serving === serving, 'Person to serve is not correct');
		ok(p.receiving === receiving, 'Person to receive is not correct');
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
			clash = new k.Clash(parties, new clashService.ClashDetails(10, parties[0].individuals[0], parties[1].individuals[0]));
			projector = new ScoreProjector(clash);
		},
		teardown: function () { }
	});

	test('AngularJS Injections', function () {
		ok(angular.isObject(clash), 'We don\'t have the clash instance');
		ok(angular.isObject(projector), 'We don\'t have the projector instance');
	});

	test('Initial projection', function () {
		projectionOk(0, 0, clash.details.firstToServe, clash.details.firstToReceive);
	});

	test('A point is scored', function () {
		clash.pointFor(clash.parties[0]);

		var servingParty = _.contains(clash.parties[0].individuals, clash.details.firstToServe) ? clash.parties[0] : clash.parties[1],
			receivingParty = servingParty === clash.parties[0] ? clash.parties[1] : clash.parties[0],
			receiverShouldBe = receivingParty.individuals.length === 1
				? receivingParty.individuals[0]
				: _.find(receivingParty.individuals, function (m) { return m !== clash.details.firstToReceive });

		projectionOk(1, 0, clash.details.firstToServe, receiverShouldBe);
	});

}).call(this, this.angular, this.H.ScoreKeeper, this._);
