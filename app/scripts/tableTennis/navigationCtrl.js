(function (angular) {
    'use strict';

    angular.module('ScoreKeeper.TableTennis')
    .controller('navigation', ['$scope', '$window', '$timeout', function ($s, $w, $t) {

        $s.goHome = function () {
            if (!$s.goHome.confirm) {
                $s.goHome.confirm = true;
                $t(function () {
                    delete $s.goHome.confirm;
                }, 5000);
                return;
            }

            delete $s.goHome.confirm;

            $w.location.href = 'index.html';
        };

    }]);

}).call(this, this.angular);