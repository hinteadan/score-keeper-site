(function (angular) {
    'use strict';

    angular.module('ScoreKeeper.Common')
    .directive('realtimeStatus', [function () {
        return {
            restrict: 'E',
            transclude: false,
            replace: true,
            templateUrl: 'scripts/common/realtimeStatus.tmpl.html'
        };
    }]);

}).call(this, this.angular);