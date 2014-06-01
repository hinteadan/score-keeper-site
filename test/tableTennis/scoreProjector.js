(function (angular, k) {
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
		ok(p.scorePerPartyName[clash.parties[0].name] === scoreA, 'Team 1 score is correct');
		ok(p.scorePerPartyName[clash.parties[1].name] === scoreB, 'Team 2 score is correct');
		ok(p.serving === serving, 'Person to serve is correct');
		ok(p.receiving === receiving, 'Person to receive is correct');
	}

	test('AngularJS Injections', function () {
		ok(angular.isFunction(ScoreProjector), 'We have the ScoreProjector class');
		ok(angular.isObject(clashService), 'We have the clash service');
		ok(angular.isObject(clash), 'We have the clash instance');
		ok(angular.isObject(projector), 'We have the projector instance');
	});

	test('Initial projection', function () {
		projectionOk(0, 0, clash.details.firstToServe, clash.details.firstToReceive);
	});

}).call(this, this.angular, this.H.ScoreKeeper);
