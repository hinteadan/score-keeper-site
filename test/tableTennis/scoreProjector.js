(function (angular) {
	'use strict';

	var ScoreProjector = angular.injector(['ScoreKeeper.TableTennis', 'ngRoute']).get('ScoreProjector');

	test('dummy', function () {
		ok(angular.isFunction(ScoreProjector));
	});

}).call(this, this.angular);