(function (angular, k) {
	'use strict';

	function ClashDetails(pointsToWin, firstToServe) {
		this.pointsToWin = pointsToWin || 20;
		this.firstToServe = firstToServe;
	}

	angular.module('ScoreKeeper.TableTennis')
	.service('Clash', [function () {
		var parties = [
				new k.Party(),
				new k.Party()
			],
			clashDetails = new ClashDetails();

		this.parties = parties;
		this.details = clashDetails;
	}]);

}).call(this, this.angular, this.H.ScoreKeeper);