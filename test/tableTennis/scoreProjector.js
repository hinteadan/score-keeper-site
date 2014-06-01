(function (angular, k, _) {
	'use strict';

	var inject = angular.injector(['ScoreKeeper.TableTennis', 'ngRoute']),
		ScoreProjector = inject.get('ScoreProjector'),
		clashService = inject.get('Clash'),
		clash = null,
		projector = null;

	module('Table Tennis', {
		setup: function () {
			clash = clashService.clash();
			projector = new ScoreProjector(clash);
		},
		teardown: function () { }
	})

	function projectionOk(scoreA, scoreB, serving, receiving) {
		var p = projector.now();
		ok(p.scorePerPartyName[clash.parties[0].name] === scoreA, 'Team 1 score is not correct');
		ok(p.scorePerPartyName[clash.parties[1].name] === scoreB, 'Team 2 score is not correct');
		ok(p.serving === serving, 'Person to serve is not correct');
		ok(p.receiving === receiving, 'Person to receive is not correct');
	}

	test('AngularJS Injections', function () {
		ok(angular.isFunction(ScoreProjector), 'We don\'t have the ScoreProjector class');
		ok(angular.isObject(clashService), 'We don\'t have the clash service');
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
