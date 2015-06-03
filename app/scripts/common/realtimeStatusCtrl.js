(function (angular) {
    'use strict';

    angular.module('ScoreKeeper.Common')
    .controller('realtimeStatus', ['$scope', 'realtime', function ($s, realtime) {

        var status = {
            disconnected: 0,
            connecting: 1,
            connected: 2
        },
            literals = ['disconnected', 'connecting', 'connected'],
            friendlyStatus = [
                'Realtime notifications not available',
                'Connecting to realtime notifications...',
                'Connected and ready for realtime notifications'
            ];

        function initialize() {
            $s.state = status.connecting;
            realtime.bind().then(function () {
                $s.state = status.connected;
            }, function () {
                $s.state = status.disconnected;
            });
        }

        $s.status = status;
        $s.state = status.disconnected;
        $s.literalState = function () {
            return literals[$s.state];
        };
        $s.friendlyStatus = friendlyStatus;

        initialize();

    }]);

}).call(this, this.angular);