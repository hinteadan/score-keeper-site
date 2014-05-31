(function (angular) {
	'use strict';

	var pointReason = {
			winningShot: 'WinningShot',
			forcedErrorOnOpponent: 'ForcedErrorOnOpponent',
			unforcedErrorOnOpponent: 'UnforcedErrorOnOpponent'
		},
		spin = {
			topspin: 'Topspin',
			flat: 'Flat',
			slice: 'Slice'
		},
		handling = {
			forehand: 'Forehand',
			backhand: 'Backhand'
		};

	function PointDetails(reason, spin, handle) {
		this.reason = reason || pointReason.winningShot;
		this.spin = spin || spin.flat;
		this.handle = handle || handling.forehand;
	}
	PointDetails.reason = pointReason;
	PointDetails.spin = spin;
	PointDetails.handle = handling;

	angular.module('ScoreKeeper.TableTennis').value('PointDetails', PointDetails);

}).call(this, this.angular);