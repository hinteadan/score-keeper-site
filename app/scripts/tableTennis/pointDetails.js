(function (angular) {
	'use strict';

	var pointReason = {
			winningShot: 'WinningShot',
			forcedErrorOnOpponent: 'ForcedErrorOnOpponent',
			unforcedErrorByOpponent: 'UnforcedErrorByOpponent'
		},
		shotSpin = {
			topspin: 'Topspin',
			flat: 'Flat',
			slice: 'Slice'
		},
		handling = {
			forehand: 'Forehand',
			backhand: 'Backhand'
		};

	function PointDetails(reason, spin, handle) {
		this.creditTo = null;
		this.reason = reason || pointReason.winningShot;
		this.spin = spin || shotSpin.flat;
		this.handle = handle || handling.forehand;
	}
	PointDetails.reason = pointReason;
	PointDetails.spin = shotSpin;
	PointDetails.handle = handling;

	angular.module('ScoreKeeper.TableTennis').value('PointDetails', PointDetails);

}).call(this, this.angular);