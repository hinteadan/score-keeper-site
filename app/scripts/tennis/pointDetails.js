(function (angular) {
    'use strict';

    var pointReason = {
        winningShot: 'WinningShot',
        forcedErrorOnOpponent: 'ForcedErrorOnOpponent',
        unforcedErrorByOpponent: 'UnforcedErrorByOpponent',
        fault: 'Fault'
    },
		shotSpin = {
		    topspin: 'Topspin',
		    flat: 'Flat',
		    slice: 'Slice'
		},
		handling = {
		    forehand: 'Forehand',
		    backhand: 'Backhand'
		},
		shotStyle = {
		    regular: 'Regular',
		    drop: 'Drop',
		    lob: 'Lob',
		    smash: 'Smash',
		    overhead: 'Overhead',
		    cross: 'Cross',
		    insideOut: 'InsideOut',
		    downTheLine: 'DownTheLine'
		},
		ballGrabStyle = {
		    regular: 'Regular',
		    volley: 'Volley',
		    halfVolley: 'HalfVolley'
		};

    function PointDetails(reason, spin, handle, style, grab) {
        this.creditTo = null;
        this.reason = reason || pointReason.winningShot;
        this.spin = spin || shotSpin.flat;
        this.handle = handle || handling.forehand;
        this.style = style || shotStyle.regular;
        this.grab = grab || ballGrabStyle.regular;
    }
    PointDetails.reason = pointReason;
    PointDetails.spin = shotSpin;
    PointDetails.handle = handling;
    PointDetails.style = shotStyle;
    PointDetails.grab = ballGrabStyle;

    angular.module('ScoreKeeper.Tennis').value('PointDetails', PointDetails);

}).call(this, this.angular);