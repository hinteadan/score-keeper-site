(function (angular, k) {
    'use strict';

    angular.module('ScoreKeeper.Tennis')
	.service('Fray', ['FrayDetails', function (FrayDetails) {
		var parties = [
				new k.Party(),
				new k.Party()
			],
			frayDetails = new FrayDetails();

		this.parties = parties;
		this.details = frayDetails;
	}]);

}).call(this, this.angular, this.H.ScoreKeeper);