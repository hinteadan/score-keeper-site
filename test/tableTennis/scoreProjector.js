(function (angular, k) {
	'use strict';

	var inject = angular.injector(['ScoreKeeper.TableTennis', 'ngRoute']),
		ScoreProjector = inject.get('ScoreProjector'),
		clash = inject.get('Clash');

	module('Table Tennis', {
		setup: function () { },
		teardown: function () { }
	})

	test('AngularJS Injections', function () {
		ok(angular.isFunction(ScoreProjector), 'We have the ScoreProjector class');
		ok(angular.isObject(clash), 'We have the clash repository');
	});

}).call(this, this.angular, this.H.ScoreKeeper);