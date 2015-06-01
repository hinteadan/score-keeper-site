(function (angular) {
    'use strict';

    angular.module('ScoreKeeper.TableTennis')
    .controller('view', ['$scope', 'realtime', function ($s, realtime) {

        realtime.bind().then(function (api) {
            /// <param name="api" type="H.DataStore.Realtime.Api" />

            api.setOnChangeHandler(function (payload) {
                /// <param name="payload" type="H.DataStore.Entity" />
                $s.data.push(payload.Data);
                $s.$apply();
            });

        });

        $s.data = [];

    }]);

}).call(this, this.angular);