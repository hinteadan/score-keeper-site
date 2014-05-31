(function (angular, k) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
	.service('Clash', [function () {
		var parties = [
				new k.Party(),
				new k.Party()
		];

		this.parties = parties;
	}]);

}).call(this, this.angular, this.H.ScoreKeeper);